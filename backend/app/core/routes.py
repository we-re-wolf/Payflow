from flask import Blueprint

core = Blueprint('core', __name__)

@core.route('/')
def index():
    return "Welcome to PayFlow Pro API!"