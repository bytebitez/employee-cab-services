from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app import db
from models.user import User
from utils.email import send_email
from flasgger import swag_from

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'phone_number': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {
            'description': 'Login successful',
            'schema': {
                'type': 'object',
                'properties': {
                    'access_token': {'type': 'string'}
                }
            }
        },
        '401': {'description': 'Invalid credentials'}
    }
})
def login():
    """
    User Login
    """
    data = request.get_json()
    user = User.query.filter_by(phone_number=data.get('phone_number')).first()
    if user and check_password_hash(user.password_hash, data.get('password')):
        access_token = create_access_token(identity={'id': user.id, 'role': user.role})
        return jsonify(access_token=access_token), 200
    return jsonify(message='Invalid credentials'), 401

@auth_bp.route('/change-password', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'phone_number': {'type': 'string'},
                    'old_password': {'type': 'string'},
                    'new_password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {'description': 'Password updated successfully'},
        '401': {'description': 'Invalid credentials'}
    }
})
def change_password():
    """
    Change user password
    """
    data = request.get_json()
    user = User.query.filter_by(phone_number=data.get('phone_number')).first()
    if user and check_password_hash(user.password_hash, data.get('old_password')):
        user.password_hash = generate_password_hash(data.get('new_password'))
        db.session.commit()
        return jsonify(message='Password updated successfully'), 200
    return jsonify(message='Invalid credentials'), 401

@auth_bp.route('/forgot-password', methods=['POST'])
@swag_from({
    'tags': ['Authentication'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'email': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {'description': 'New password sent to your email'},
        '404': {'description': 'User not found'}
    }
})
def forgot_password():
    """
    forgot password
    """
    data = request.get_json()
    user = User.query.filter_by(email=data.get('email')).first()
    if user:
        new_password = 'new_password'  # Generate a new password or token
        user.password_hash = generate_password_hash(new_password)
        db.session.commit()
        send_email(user.email, 'Password Reset', f'Your new password is {new_password}')
        return jsonify(message='New password sent to your email'), 200
    return jsonify(message='User not found'), 404

@auth_bp.route('/register/employee', methods=['POST'])
@swag_from({
    'tags': ['Registration'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'first_name': {'type': 'string'},
                    'last_name': {'type': 'string'},
                    'phone_number': {'type': 'string'},
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '201': {'description': 'Employee registered successfully'},
        '400': {'description': 'User already exists'}
    }
})
def register_employee():
    """
    Register Employee
    """
    return register_user(request.get_json(), 'employee')

@auth_bp.route('/register/driver', methods=['POST'])
@swag_from({
    'tags': ['Registration'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'first_name': {'type': 'string'},
                    'last_name': {'type': 'string'},
                    'phone_number': {'type': 'string'},
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '201': {'description': 'Driver registered successfully'},
        '400': {'description': 'User already exists'}
    }
})
def register_driver():
    """
    Register driver
    """
    return register_user(request.get_json(), 'driver')

@auth_bp.route('/register/admin', methods=['POST'])
@swag_from({
    'tags': ['Registration'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'first_name': {'type': 'string'},
                    'last_name': {'type': 'string'},
                    'phone_number': {'type': 'string'},
                    'email': {'type': 'string'},
                    'password': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '201': {'description': 'Admin registered successfully'},
        '400': {'description': 'User already exists'}
    }
})
def register_admin():
    """
    Register Admin 
    """
    return register_user(request.get_json(), 'admin')

def register_user(data, role):
    if User.query.filter((User.phone_number == data.get('phone_number')) | (User.email == data.get('email'))).first():
        return jsonify(message='User already exists'), 400
    user = User(
        first_name=data.get('first_name'),
        last_name=data.get('last_name'),
        phone_number=data.get('phone_number'),
        email=data.get('email'),
        password_hash=generate_password_hash(data.get('password')),
        role=role,
        status='inactive'
    )
    db.session.add(user)
    db.session.commit()
    return jsonify(message=f'{role.capitalize()} registered successfully'), 201
