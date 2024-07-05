from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models.user import User
from flasgger import swag_from

user_bp = Blueprint('user', __name__)

@user_bp.route('/user/<int:id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['User'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the user'
        }
    ],
    'responses': {
        '200': {
            'description': 'User data',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'first_name': {'type': 'string'},
                    'last_name': {'type': 'string'},
                    'phone_number': {'type': 'string'},
                    'email': {'type': 'string'},
                    'role': {'type': 'string'},
                    'status': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
                }
            }
        },
        '404': {'description': 'User not found'}
    }
})
def get_user(id):
    """
    Retrieve user details by ID.
    """
    user = User.query.get_or_404(id)
    return jsonify(user.to_dict()), 200

@user_bp.route('/user/<int:id>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['User'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the user to update'
        },
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
                    'status': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {'description': 'User updated successfully'},
        '404': {'description': 'User not found'}
    }
})
def update_user(id):
    """
    Update user details by ID.
    """
    user = User.query.get_or_404(id)
    data = request.get_json()
    user.first_name = data.get('first_name', user.first_name)
    user.last_name = data.get('last_name', user.last_name)
    user.phone_number = data.get('phone_number', user.phone_number)
    user.email = data.get('email', user.email)
    user.status = data.get('status', user.status)
    db.session.commit()
    return jsonify(message='User updated successfully'), 200

@user_bp.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['User'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer',
            'description': 'ID of the user to delete'
        }
    ],
    'responses': {
        '200': {'description': 'User deleted successfully'},
        '404': {'description': 'User not found'}
    }
})
def delete_user(id):
    """
    Delete user by ID.
    """
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return jsonify(message='User deleted successfully'), 200
