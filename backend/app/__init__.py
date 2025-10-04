from flask import Flask, jsonify
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_cors import CORS

db = SQLAlchemy()
migrate = Migrate()
flask_bcrypt = Bcrypt()
login_manager = LoginManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    # This is a workaround for development over HTTP.
    # In production with HTTPS, this is not needed.
    if app.debug:
        app.config['SESSION_COOKIE_SECURE'] = False

    CORS(app, supports_credentials=True, resources={r"/api/*": {"origins": "http://localhost:9002"}})

    db.init_app(app)
    migrate.init_app(app, db)
    flask_bcrypt.init_app(app)
    login_manager.init_app(app)

    @login_manager.unauthorized_handler
    def unauthorized():
        return jsonify({'message': 'Authentication required.'}), 401
    
    from app.auth.routes import auth
    from app.core.routes import core
    from app.employee.routes import employee_bp
    from app.admin.routes import admin_bp

    app.register_blueprint(auth)
    app.register_blueprint(core)
    app.register_blueprint(employee_bp)
    app.register_blueprint(admin_bp)

    return app