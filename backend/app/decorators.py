from functools import wraps
from flask import jsonify
from flask_login import current_user

def permission_required(permission):
    """Custom decorator to check if a user has a specific permission."""
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            # This check is crucial. If the user isn't authenticated, current_user won't have the has_permission method.
            if not current_user.is_authenticated:
                return jsonify({'message': 'Authentication required.'}), 401
            
            if not current_user.has_permission(permission):
                return jsonify({'message': 'Permission denied. You do not have the required clearance.'}), 403
            
            return f(*args, **kwargs)
        return decorated_function
    return decorator