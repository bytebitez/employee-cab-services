from flask import Blueprint, request, jsonify, render_template
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from app import db
from models.user import User
from utils.email import send_email
from flasgger import swag_from
import secrets
import string

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
        user_data = {
            'id': user.id,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'phone_number': user.phone_number,
            'email': user.email,
            'role': user.role,
            'status': user.status,
            'created_at': user.created_at,
            'updated_at': user.updated_at
        }
        return jsonify({'user': user_data, 'token': access_token}), 200
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

def generate_random_password(length=12):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    password = ''.join(secrets.choice(alphabet) for i in range(length))
    return password

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
        new_password = generate_random_password()
        user.password_hash = generate_password_hash(new_password)
        db.session.commit()
        html_body = render_template(
            'reset_password.html',
            company_name='Cab Service',
            new_password=new_password
        )
        send_email(user.email, 'Password Reset', f'Your new password is {new_password}', html_body)
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
    try:
        new_user = User(
            first_name=data['firstName'],
            last_name=data['lastName'],
            phone_number=data['phoneNumber'],
            email=data['email'],
            password_hash=generate_password_hash(data['password']),
            role=role
        )
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 400
