from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from models.availability import Availability
from flasgger import swag_from

availability_bp = Blueprint('availability', __name__)

@availability_bp.route('/availability', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Availability'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'driver_id': {'type': 'integer'},
                    'available_date': {'type': 'string', 'format': 'date'},
                    'start_time': {'type': 'string', 'format': 'time'},
                    'end_time': {'type': 'string', 'format': 'time'}
                }
            }
        }
    ],
    'responses': {
        '201': {'description': 'Availability created successfully'},
        '400': {'description': 'Invalid data'}
    }
})
def create_availability():
    data = request.get_json()
    availability = Availability(
        driver_id=data.get('driver_id'),
        available_date=data.get('available_date'),
        start_time=data.get('start_time'),
        end_time=data.get('end_time')
    )
    db.session.add(availability)
    db.session.commit()
    return jsonify(message='Availability created successfully', availability=availability.to_dict()), 201

@availability_bp.route('/availability/<int:id>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Availability'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        },
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'available_date': {'type': 'string', 'format': 'date'},
                    'start_time': {'type': 'string', 'format': 'time'},
                    'end_time': {'type': 'string', 'format': 'time'},
                    'status': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {'description': 'Availability updated successfully'},
        '404': {'description': 'Availability not found'}
    }
})
def update_availability(id):
    availability = Availability.query.get_or_404(id)
    data = request.get_json()
    availability.available_date = data.get('available_date', availability.available_date)
    availability.start_time = data.get('start_time', availability.start_time)
    availability.end_time = data.get('end_time', availability.end_time)
    availability.status = data.get('status', availability.status)
    db.session.commit()
    return jsonify(message='Availability updated successfully', availability=availability.to_dict()), 200

@availability_bp.route('/availability/<int:id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Availability'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        '200': {
            'description': 'Availability data',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'driver_id': {'type': 'integer'},
                    'available_date': {'type': 'string', 'format': 'date'},
                    'start_time': {'type': 'string', 'format': 'time'},
                    'end_time': {'type': 'string', 'format': 'time'},
                    'status': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
                }
            }
        },
        '404': {'description': 'Availability not found'}
    }
})
def get_availability(id):
    availability = Availability.query.get_or_404(id)
    return jsonify(availability.to_dict()), 200

@availability_bp.route('/availability/<int:id>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['Availability'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        '200': {'description': 'Availability deleted successfully'},
        '404': {'description': 'Availability not found'}
    }
})
def delete_availability(id):
    availability = Availability.query.get_or_404(id)
    db.session.delete(availability)
    db.session.commit()
    return jsonify(message='Availability deleted successfully'), 200

@availability_bp.route('/availabilities/driver/<int:driver_id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Availability'],
    'parameters': [
        {
            'name': 'driver_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        '200': {
            'description': 'List of availabilities',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'driver_id': {'type': 'integer'},
                        'available_date': {'type': 'string', 'format': 'date'},
                        'start_time': {'type': 'string', 'format': 'time'},
                        'end_time': {'type': 'string', 'format': 'time'},
                        'status': {'type': 'string'},
                        'created_at': {'type': 'string', 'format': 'date-time'},
                        'updated_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_availabilities_by_driver(driver_id):
    availabilities = Availability.query.filter_by(driver_id=driver_id).all()
    return jsonify([availability.to_dict() for availability in availabilities]), 200
