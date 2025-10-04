import random
import string
from flask import Blueprint, request, jsonify
from app.models import User, Role, Employee, Department, Designation
from app import db
from flask_login import login_required
from functools import wraps
from app.decorators import permission_required
from app.models import User, Role, Employee, employee_id_seq
from datetime import datetime
from app.email import send_temporary_password_email
employee_bp = Blueprint('employee', __name__, url_prefix='/api/employees')


def generate_temporary_password(length=10):
    """Generates a secure temporary password."""
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for i in range(length))


@employee_bp.route('/create', methods=['POST'])
@login_required
@permission_required('user.create')
def create_employee():
    data = request.get_json()
    
    required_fields = ['email', 'firstName', 'lastName', 'dateOfJoining', 'role_id']
    if not all(field in data for field in required_fields):
        return jsonify({'message': 'Missing required fields.'}), 400

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'message': 'User with this email already exists.'}), 409
    
    role = Role.query.get(data['role_id'])
    if not role:
        return jsonify({'message': 'Invalid role specified.'}), 400

    # --- Auto-generate Employee Number ---
    next_id = db.session.execute(employee_id_seq)
    emp_number = f"EMP-{datetime.utcnow().year}-{next_id:04d}"
    print(f"Generated new employee number: {emp_number}")
    # ---

    temp_password = generate_temporary_password()

    new_user = User(email=data['email'])
    new_user.set_password(temp_password)
    new_user.roles.append(role)
    
    new_employee = Employee(
        employee_number=emp_number, # Use the generated number
        first_name=data['firstName'],
        last_name=data['lastName'],
        date_of_joining=data['dateOfJoining'],
        user=new_user
    )
    
    db.session.add(new_user)
    db.session.add(new_employee)
    db.session.commit()

    send_temporary_password_email(new_user, temp_password)

    return jsonify({
        'message': 'Employee and user account created successfully.',
        'employeeNumber': emp_number
    }), 201