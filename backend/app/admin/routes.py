from flask import Blueprint, jsonify, request
from app.models import Role, User, Employee
from flask_login import login_required, current_user
from app.decorators import permission_required # We can reuse the decorator
from app import db

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/roles', methods=['GET'])
@login_required
@permission_required('user.read') # Protect the endpoint
def get_roles():
    """
    Fetches a list of all available roles in the system.
    """
    try:
        roles = Role.query.all()
        roles_data = [{'id': role.id, 'name': role.name} for role in roles]
        return jsonify(roles_data), 200
    except Exception as e:
        return jsonify({'message': 'Failed to fetch roles', 'error': str(e)}), 500
    
@admin_bp.route('/users', methods=['GET'])
@login_required
@permission_required('user.read')
def get_users():
    """Fetches a list of all users with their details."""
    try:
        users = User.query.join(User.employee).join(User.roles).all()
        users_data = []
        for user in users:
            users_data.append({
                'id': user.id,
                'name': f"{user.employee.first_name} {user.employee.last_name}",
                'email': user.email,
                'employee_number': user.employee.employee_number,
                'date_of_joining': user.employee.date_of_joining.strftime('%Y-%m-%d'),
                'role': user.roles[0].name if user.roles else 'N/A', # Assuming one role for now
                'role_id': user.roles[0].id if user.roles else None,
                'status': 'Active' if user.is_active else 'Inactive'
            })
        return jsonify(users_data), 200
    except Exception as e:
        print(f"Error fetching users: {e}")
        return jsonify({'message': 'Failed to fetch users', 'error': str(e)}), 500

@admin_bp.route('/users/<int:user_id>', methods=['PUT'])
@login_required
@permission_required('user.update')
def update_user(user_id):
    """Updates a user's details."""
    user = User.query.get_or_404(user_id)
    data = request.get_json()

    # Update Employee details
    if 'firstName' in data:
        user.employee.first_name = data['firstName']
    if 'lastName' in data:
        user.employee.last_name = data['lastName']
    if 'dateOfJoining' in data:
        user.employee.date_of_joining = data['dateOfJoining']
    
    # Update Role
    if 'role_id' in data:
        new_role = Role.query.get(data['role_id'])
        if new_role:
            user.roles = [new_role]
        else:
            return jsonify({'message': 'Invalid role ID'}), 400

    db.session.commit()
    return jsonify({'message': 'User updated successfully.'}), 200

@admin_bp.route('/users/<int:user_id>', methods=['DELETE'])
@login_required
@permission_required('user.delete')
def delete_user(user_id):
    """Deletes a user and their associated employee record."""
    user = User.query.get_or_404(user_id)
    
    # Prevent admin from deleting themselves
    if user.id == current_user.id:
        return jsonify({'message': 'You cannot delete your own account.'}), 403

    # The `cascade="all, delete-orphan"` on the User model will handle deleting the employee record.
    db.session.delete(user)
    db.session.commit()
    
    return jsonify({'message': 'User deleted successfully.'}), 200