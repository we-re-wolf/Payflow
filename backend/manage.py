# payflow-pro-backend/manage.py

from app import create_app, db, flask_bcrypt
from app.models import (
    User, Role, Permission, Employee, Department, Designation,
    SalaryStructure, SalaryComponent, EmployeeSalary,
    PayrollPeriod, Payslip, PayslipDetail, Loan, LoanRepayment
)
import random
from datetime import datetime
import string
from app.email import send_temporary_password_email

app = create_app()

def generate_temporary_password(length=10):
    """Generates a secure temporary password."""
    characters = string.ascii_letters + string.digits + string.punctuation
    return ''.join(random.choice(characters) for i in range(length))

@app.cli.command("init-db")
def init_db_command():
    """Initializes the database with roles, permissions, and an admin user."""
    print("Setting up initial roles and permissions...")
    db.create_all() # Ensure all tables are created

    # --- Define all permissions for the application ---
    permissions = {
        'user.create', 'user.read', 'user.update', 'user.delete',
        'role.assign', 'payroll.run', 'employee.manage'
    }
    for perm_name in permissions:
        if not Permission.query.filter_by(name=perm_name).first():
            db.session.add(Permission(name=perm_name))
    db.session.commit()
    print(f"Created/verified {len(permissions)} permissions.")

    # --- Define roles and their associated permissions ---
    all_perms = Permission.query.all()
    hr_perms = Permission.query.filter(
        Permission.name.in_(['user.create', 'user.read', 'user.update', 'employee.manage'])
    ).all()
    
    roles_to_create = {
        'Admin': {'desc': 'System Administrator', 'perms': all_perms},
        'HR Lead': {'desc': 'Full HR access', 'perms': all_perms},
        'Senior HR': {'desc': 'Senior Human Resources staff', 'perms': hr_perms},
        'Junior HR': {'desc': 'Junior Human Resources staff', 'perms': [Permission.query.filter_by(name='employee.manage').first()]},
        'Employee': {'desc': 'Regular employee self-service access', 'perms': []}
    }

    for role_name, role_info in roles_to_create.items():
        role = Role.query.filter_by(name=role_name).first()
        if not role:
            role = Role(name=role_name, description=role_info['desc'])
            db.session.add(role)
        role.permissions = role_info['perms']
    db.session.commit()
    print(f"Created/verified {len(roles_to_create)} roles.")

    # --- Create Admin User ---
    if User.query.filter(User.roles.any(Role.name == 'Admin')).first():
        print("Admin user already exists.")
        return

    print("Creating admin user...")
    admin_email = input("Enter admin email: ")
    temp_password = generate_temporary_password()
    admin_role = Role.query.filter_by(name='Admin').first()

    admin_user = User(email=admin_email)
    admin_user.set_password(temp_password)
    admin_user.roles.append(admin_role)
    
    # Auto-generate the employee number
    next_id = db.session.execute(employee_id_seq)
    emp_number = f"EMP-{datetime.utcnow().year}-{next_id:04d}"

    admin_employee = Employee(
        employee_number=emp_number,
        first_name='Admin',
        last_name='User',
        date_of_joining=datetime.utcnow().date(),
        user=admin_user
    )

    db.session.add(admin_user)
    db.session.add(admin_employee)
    db.session.commit()

    try:
        send_temporary_password_email(admin_user, temp_password)
        print("\n" + "="*50)
        print("Admin user created successfully!")
        print(f"Employee Number: {emp_number}")
        print(f"An email with temporary credentials has been sent to {admin_email}.")
        print("="*50 + "\n")
    except Exception as e:
        print("\n" + "!"*50)
        print(f"Admin user created (Employee No: {emp_number}), but email failed.")
        print(f"Error: {e}")
        print(f"Temporary Password for {admin_email} is: {temp_password}")
        print("!"*50 + "\n")

@app.cli.command("create_admin")
def create_admin():
    """Creates the initial admin user and roles."""
    print("Setting up initial roles and permissions...")
    
    # --- Create Permissions ---
    permissions = [
        'user.create', 'user.read', 'user.update', 'user.delete',
        'role.assign', 'payroll.run', 'employee.manage' 
        # Add all other permissions your app will need
    ]
    for perm_name in permissions:
        if not Permission.query.filter_by(name=perm_name).first():
            db.session.add(Permission(name=perm_name))

    # --- Create Roles ---
    admin_role = Role.query.filter_by(name='Admin').first()
    if not admin_role:
        admin_role = Role(name='Admin', description='System Administrator with all permissions')
        admin_role.permissions = Permission.query.all()
        db.session.add(admin_role)

    hr_role = Role.query.filter_by(name='HR').first()
    if not hr_role:
        hr_role = Role(name='HR', description='Human Resources Manager')
        hr_perms = Permission.query.filter(Permission.name.startswith('employee.')).all()
        hr_role.permissions = hr_perms
        db.session.add(hr_role)
    
    employee_role = Role.query.filter_by(name='Employee').first()
    if not employee_role:
        employee_role = Role(name='Employee', description='Regular employee access')
        db.session.add(employee_role)

    db.session.commit()
    print("Roles and permissions created.")

    # --- Create Admin User ---
    if User.query.filter(User.roles.any(Role.name == 'Admin')).first():
        print("Admin user already exists.")
        return

    print("Creating admin user...")
    admin_email = input("Enter admin email: ")
    temp_password = generate_temporary_password()

    admin_user = User(email=admin_email)
    admin_user.set_password(temp_password)
    admin_user.roles.append(admin_role)
    
    # Create a dummy employee record for the admin
    admin_employee = Employee(
        employee_number='ADMIN-001',
        first_name='Admin',
        last_name='User',
        date_of_joining=datetime.utcnow().date(),
        user=admin_user
    )

    db.session.add(admin_user)
    db.session.add(admin_employee)
    db.session.commit()

    try:
        send_temporary_password_email(admin_user, temp_password)
        print("\n" + "="*50)
        print("Admin user created successfully!")
        print(f"An email with temporary credentials has been sent to {admin_email}.")
        print("="*50 + "\n")
    except Exception as e:
        print("\n" + "!"*50)
        print("Admin user was created in the database, but the email failed to send.")
        print(f"Please check your MAIL_* environment variables and SMTP server settings.")
        print(f"Error: {e}")
        print(f"Temporary Password for {admin_email} is: {temp_password}")
        print("!"*50 + "\n")

@app.shell_context_processor
def make_shell_context():
    return {
        'db': db, 
        'User': User, 
        'Role': Role,
        'Permission': Permission,
        'Employee': Employee,
        'Department': Department, 
        'Designation': Designation,
        'SalaryStructure': SalaryStructure,
        'SalaryComponent': SalaryComponent,
        'EmployeeSalary': EmployeeSalary,
        'PayrollPeriod': PayrollPeriod,
        'Payslip': Payslip,
        'PayslipDetail': PayslipDetail,
        'Loan': Loan,
        'LoanRepayment': LoanRepayment
    }