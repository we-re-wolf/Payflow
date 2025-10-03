# payflow-pro-backend/app/models.py

from app import db, login_manager, flask_bcrypt
from flask_login import UserMixin
from datetime import datetime
import enum
from itsdangerous import URLSafeTimedSerializer as Serializer
from flask import current_app

# ==============================================================================
# User Authentication & RBAC (Role-Based Access Control)
# ==============================================================================

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Association table for User-Role relationship (Many-to-Many)
user_roles = db.Table('user_roles',
    db.Column('user_id', db.Integer, db.ForeignKey('user.id'), primary_key=True),
    db.Column('role_id', db.Integer, db.ForeignKey('role.id'), primary_key=True)
)

# Association table for Role-Permission relationship (Many-to-Many)
role_permissions = db.Table('role_permissions',
    db.Column('role_id', db.Integer, db.ForeignKey('role.id'), primary_key=True),
    db.Column('permission_id', db.Integer, db.ForeignKey('permission.id'), primary_key=True)
)

class User(db.Model, UserMixin):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(128), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    force_password_change = db.Column(db.Boolean, default=True, nullable=False)

    # Relationships
    roles = db.relationship('Role', secondary=user_roles, back_populates='users')
    employee = db.relationship('Employee', back_populates='user', uselist=False, cascade="all, delete-orphan")

    def set_password(self, password):
        # Use the renamed object here
        self.password_hash = flask_bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        # And here
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    def has_permission(self, perm_name):
        for role in self.roles:
            for permission in role.permissions:
                if permission.name == perm_name:
                    return True
        return False
    
    def get_reset_token(self, expires_sec=1800):
        """Generates a secure, timed token for password reset."""
        s = Serializer(current_app.config['SECRET_KEY'])
        return s.dumps({'user_id': self.id})

    @staticmethod
    def verify_reset_token(token, expires_sec=1800):
        """Verifies a password reset token and returns the user."""
        s = Serializer(current_app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token, max_age=expires_sec)['user_id']
        except Exception:
            return None
        return User.query.get(user_id)

    def __repr__(self):
        return f'<User {self.email}>'

class Role(db.Model):
    __tablename__ = 'role'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=True, nullable=False)
    description = db.Column(db.String(255))
    
    # Relationships
    users = db.relationship('User', secondary=user_roles, back_populates='roles')
    permissions = db.relationship('Permission', secondary=role_permissions, back_populates='roles')

    def __repr__(self):
        return f'<Role {self.name}>'

class Permission(db.Model):
    __tablename__ = 'permission'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False) # e.g., 'employee.create', 'payroll.run'
    description = db.Column(db.String(255))
    
    # Relationships
    roles = db.relationship('Role', secondary=role_permissions, back_populates='permissions')

    def __repr__(self):
        return f'<Permission {self.name}>'

# ==============================================================================
# Core HR Models (Employee Lifecycle)
# ==============================================================================

class Employee(db.Model):
    __tablename__ = 'employee'
    id = db.Column(db.Integer, primary_key=True)
    employee_number = db.Column(db.String(50), unique=True, nullable=False, index=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    date_of_joining = db.Column(db.Date, nullable=False)
    date_of_birth = db.Column(db.Date)
    gender = db.Column(db.String(10))
    marital_status = db.Column(db.String(20))
    personal_email = db.Column(db.String(120))
    phone_number = db.Column(db.String(20))
    
    # Foreign Keys
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True)
    department_id = db.Column(db.Integer, db.ForeignKey('department.id'))
    designation_id = db.Column(db.Integer, db.ForeignKey('designation.id'))
    manager_id = db.Column(db.Integer, db.ForeignKey('employee.id'))

    # Relationships
    user = db.relationship('User', back_populates='employee')
    manager = db.relationship('Employee', remote_side=[id], backref='direct_reports')
    salary = db.relationship('EmployeeSalary', back_populates='employee', uselist=False, cascade="all, delete-orphan")

class Department(db.Model):
    __tablename__ = 'department'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    parent_department_id = db.Column(db.Integer, db.ForeignKey('department.id'))
    employees = db.relationship('Employee', backref='department', lazy='dynamic')

class Designation(db.Model):
    __tablename__ = 'designation'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    employees = db.relationship('Employee', backref='designation', lazy='dynamic')

# ==============================================================================
# Payroll Models
# ==============================================================================

class SalaryComponentType(enum.Enum):
    EARNING = 'Earning'
    DEDUCTION = 'Deduction'

class SalaryStructureComponent(db.Model):
    __tablename__ = 'salary_structure_component'
    id = db.Column(db.Integer, primary_key=True)
    structure_id = db.Column(db.Integer, db.ForeignKey('salary_structure.id'), nullable=False)
    component_id = db.Column(db.Integer, db.ForeignKey('salary_component.id'), nullable=False)
    formula = db.Column(db.String(255)) # e.g., "base * 0.4" or "5000"
    
class SalaryStructure(db.Model):
    __tablename__ = 'salary_structure'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    is_active = db.Column(db.Boolean, default=True)
    description = db.Column(db.Text)
    
    # Relationships
    components = db.relationship('SalaryComponent', secondary='salary_structure_component', back_populates='structures')
    employee_salaries = db.relationship('EmployeeSalary', backref='structure', lazy='dynamic')

class SalaryComponent(db.Model):
    __tablename__ = 'salary_component'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    code = db.Column(db.String(20), unique=True, nullable=False) # e.g., 'BASIC', 'HRA'
    type = db.Column(db.Enum(SalaryComponentType), nullable=False)
    is_taxable = db.Column(db.Boolean, default=False)
    
    # Relationships
    structures = db.relationship('SalaryStructure', secondary='salary_structure_component', back_populates='components')
    
class EmployeeSalary(db.Model):
    __tablename__ = 'employee_salary'
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False, unique=True)
    structure_id = db.Column(db.Integer, db.ForeignKey('salary_structure.id'), nullable=False)
    base_pay = db.Column(db.Numeric(12, 2), nullable=False)
    effective_from = db.Column(db.Date, nullable=False, default=datetime.utcnow)
    
    # Relationships
    employee = db.relationship('Employee', back_populates='salary')

class PayrollPeriod(db.Model):
    __tablename__ = 'payroll_period'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False) # e.g., "October 2025"
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='Draft') # Draft, Processing, Completed, Paid

class Payslip(db.Model):
    __tablename__ = 'payslip'
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    payroll_period_id = db.Column(db.Integer, db.ForeignKey('payroll_period.id'), nullable=False)
    gross_earning = db.Column(db.Numeric(12, 2), default=0.0)
    total_deduction = db.Column(db.Numeric(12, 2), default=0.0)
    net_pay = db.Column(db.Numeric(12, 2), default=0.0)
    status = db.Column(db.String(20), default='Generated') # Generated, Published, Paid
    
    # Relationships
    details = db.relationship('PayslipDetail', backref='payslip', lazy='dynamic', cascade="all, delete-orphan")

class PayslipDetail(db.Model):
    __tablename__ = 'payslip_detail'
    id = db.Column(db.Integer, primary_key=True)
    payslip_id = db.Column(db.Integer, db.ForeignKey('payslip.id'), nullable=False)
    component_name = db.Column(db.String(100), nullable=False)
    component_type = db.Column(db.Enum(SalaryComponentType), nullable=False)
    amount = db.Column(db.Numeric(12, 2), nullable=False)

# ==============================================================================
# Loan Management Models
# ==============================================================================

class Loan(db.Model):
    __tablename__ = 'loan'
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    loan_name = db.Column(db.String(100), nullable=False)
    principal_amount = db.Column(db.Numeric(12, 2), nullable=False)
    interest_rate = db.Column(db.Numeric(5, 2), nullable=False)
    emi_amount = db.Column(db.Numeric(10, 2), nullable=False)
    loan_term_months = db.Column(db.Integer, nullable=False)
    disbursement_date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(20), default='Pending') # Pending, Approved, Active, Paid Off, Rejected

class LoanRepayment(db.Model):
    __tablename__ = 'loan_repayment'
    id = db.Column(db.Integer, primary_key=True)
    loan_id = db.Column(db.Integer, db.ForeignKey('loan.id'), nullable=False)
    payslip_id = db.Column(db.Integer, db.ForeignKey('payslip.id')) # Link to the payslip where EMI was deducted
    amount_paid = db.Column(db.Numeric(10, 2), nullable=False)
    payment_date = db.Column(db.Date, nullable=False)

# Add more models for other modules (Leave, Attendance, etc.) here as we build them.