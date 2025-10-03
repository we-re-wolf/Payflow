import random
import string
from flask import Blueprint, request, jsonify
from app.models import User, Role, Employee, Department, Designation
from app import db
from flask_login import login_required
from functools import wraps

employee_bp = Blueprint('employee', __name__, url_prefix='/api/employees')

def permission_required(permission):
    """Custom decorator to check user permissions."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            if not current_user.is_authenticated or not current_user.has_permission(permission):
                return jsonify({'message': 'Permission denied.'}), 403
            return f(*args, **kwargs)
        return decorated_function
    return decorator


def generate_temporary_password(length=10):
    """Generates a secure temporary password."""
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for i in range(length))


@employee_bp.route('/create', methods=['POST'])
@login_required
@permission_required('user.create')
def create_employee():
    data = request.get_json()
    
    # Basic validation
    required_fields = ['email', 'firstName', 'lastName', 'employeeNumber', 'dateOfJoining', 'role_id']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields.'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User with this email already exists.'}), 409
    
    if Employee.query.filter_by(employee_number=data['employeeNumber']).first():
        return jsonify({'message': 'Employee with this number already exists.'}), 409

    role = Role.query.get(data['role_id'])
    if not role:
        return jsonify({'message': 'Invalid role specified.'}), 400

    temp_password = generate_temporary_password()

    new_user = User(email=data['email'])
    new_user.set_password(temp_password)
    new_user.roles.append(role)
    
    new_employee = Employee(
        employee_number=data['employeeNumber'],
        first_name=data['firstName'],
        last_name=data['lastName'],
        date_of_joining=data['dateOfJoining'],
        user=new_user
    )
    
    # Here you would trigger an email service to send the credentials
    print(f"--- SIMULATING EMAIL ---")
    print(f"To: {new_user.email}")
    print(f"Subject: Your PayFlow Pro Account")
    print(f"Your temporary password is: {temp_password}")
    print(f"----------------------")

    db.session.add(new_user)
    db.session.add(new_employee)
    db.session.commit()

    return jsonify({'message': 'Employee and user account created successfully.'}), 201