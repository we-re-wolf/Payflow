from flask import Blueprint, request, jsonify
from app.models import User
from app import db
from flask_login import login_user, logout_user, current_user, login_required
from app.email import send_password_reset_email

auth = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    as_admin = data.get('as_admin', False)

    print(f"\n--- Login attempt ---")
    print(f"Email: {email}, As Admin: {as_admin}")

    if not email or not password:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        is_admin_user = any(role.name == 'Admin' for role in user.roles)

        if as_admin and not is_admin_user:
            # A non-admin is trying to use the admin login page
            print(f"Login FAILED for {email}: Not an admin.")
            return jsonify({'message': 'Administrative privileges required.'}), 403
        if not as_admin and is_admin_user:
            # An admin is trying to use the regular user login page
            print(f"Login FAILED for {email}: Admin attempted to use user login.")
            return jsonify({'message': 'Administrators must use the admin login page.'}), 403

        login_user(user, remember=True)
        user.last_login = db.func.now()
        db.session.commit()
        print(f"Login SUCCESS for {email}. Session cookie set.")

        if user.force_password_change:
            next_url = '/admin/login' if as_admin else '/login'
            print(f"Force password change for {email}. Redirecting to /change-password?next={next_url}")
            return jsonify({
                'message': 'Login successful. Password change required.',
                'redirect': f'/change-password?next={next_url}'
            }), 200
        
        redirect_url = '/admin/dashboard' if as_admin else '/'
        return jsonify({'message': 'Login successful.', 'redirect': redirect_url}), 200

    print(f"Login FAILED for {email}: Invalid credentials.")
    return jsonify({'message': 'Login failed. Check email and password.'}), 401


@auth.route('/change-password', methods=['POST'])
@login_required
def change_password():
    print(f"\n--- Change Password attempt ---")
    
    # Store the email before any changes happen
    user_email_for_log = current_user.email
    print(f"User: {user_email_for_log}, Authenticated: {current_user.is_authenticated}")

    data = request.get_json()
    current_password = data.get('currentPassword')
    new_password = data.get('newPassword')

    if not all([current_password, new_password]):
        return jsonify({'message': 'Current and new passwords are required.'}), 400

    if not current_user.check_password(current_password):
        print(f"Password change FAILED for {user_email_for_log}: Incorrect current password.")
        return jsonify({'message': 'Current password is incorrect.'}), 401

    if len(new_password) < 8:
        return jsonify({'message': 'New password must be at least 8 characters long.'}), 400
        
    current_user.set_password(new_password)
    current_user.force_password_change = False
    db.session.commit()
    
    # Log the user out
    logout_user()
    
    # Now, use the stored email for the log message
    print(f"Password change SUCCESS for {user_email_for_log}. User logged out.")
    return jsonify({'message': 'Password changed successfully. Please log in again.'}), 200

# ... rest of the routes ...
@auth.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Successfully logged out.'}), 200


@auth.route('/session')
@login_required
def get_session():
    """An endpoint to check if a user is currently logged in."""
    return jsonify({
        'is_authenticated': True,
        'user': {
            'id': current_user.id,
            'email': current_user.email,
            'roles': [role.name for role in current_user.roles]
        }
    }), 200

@auth.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    email = data.get('email')
    if not email:
        return jsonify({'message': 'Email is required.'}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        send_password_reset_email(user)
    
    # We always return success to prevent attackers from finding out which emails are registered.
    return jsonify({'message': 'If an account with that email exists, a password reset token has been sent.'}), 200

# --- NEW ROUTE FOR STEP 2 ---
@auth.route('/verify-reset-token', methods=['POST'])
def verify_reset_token():
    data = request.get_json()
    token = data.get('token')
    if not token:
        return jsonify({'message': 'Token is required.'}), 400

    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({'message': 'Token is invalid or has expired.'}), 401
    
    return jsonify({'message': 'Token is valid.'}), 200


@auth.route('/reset-password', methods=['POST'])
def reset_password():
    data = request.get_json()
    token = data.get('token')
    new_password = data.get('newPassword')

    if not all([token, new_password]):
        return jsonify({'message': 'Token and new password are required.'}), 400
    
    user = User.verify_reset_token(token)
    if user is None:
        return jsonify({'message': 'Token is invalid or has expired.'}), 401
    
    if len(new_password) < 8:
        return jsonify({'message': 'Password must be at least 8 characters long.'}), 400

    user.set_password(new_password)
    user.force_password_change = False
    db.session.commit()

    return jsonify({'message': 'Your password has been reset successfully.'}), 200