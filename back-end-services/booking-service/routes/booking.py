from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from models.booking import Booking
from flasgger import swag_from

booking_bp = Blueprint('booking', __name__)

@booking_bp.route('/booking', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Booking'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'employee_id': {'type': 'integer'},
                    'pickup_location': {'type': 'string'},
                    'dropoff_location': {'type': 'string'},
                    'pickup_time': {'type': 'string', 'format': 'date-time'}
                }
            }
        }
    ],
    'responses': {
        '201': {'description': 'Booking created successfully'},
        '400': {'description': 'Invalid data'}
    }
})
def create_booking():
    data = request.get_json()
    booking = Booking(
        employee_id=data.get('employee_id'),
        pickup_location=data.get('pickup_location'),
        dropoff_location=data.get('dropoff_location'),
        pickup_time=data.get('pickup_time')
    )
    db.session.add(booking)
    db.session.commit()
    return jsonify(message='Booking created successfully', booking=booking.to_dict()), 201

@booking_bp.route('/booking/<int:id>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Booking'],
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
                    'pickup_location': {'type': 'string'},
                    'dropoff_location': {'type': 'string'},
                    'pickup_time': {'type': 'string', 'format': 'date-time'},
                    'status': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        '200': {'description': 'Booking updated successfully'},
        '404': {'description': 'Booking not found'}
    }
})
def update_booking(id):
    booking = Booking.query.get_or_404(id)
    data = request.get_json()
    booking.pickup_location = data.get('pickup_location', booking.pickup_location)
    booking.dropoff_location = data.get('dropoff_location', booking.dropoff_location)
    booking.pickup_time = data.get('pickup_time', booking.pickup_time)
    booking.status = data.get('status', booking.status)
    db.session.commit()
    return jsonify(message='Booking updated successfully', booking=booking.to_dict()), 200

@booking_bp.route('/booking/<int:id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Booking'],
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
            'description': 'Booking data',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'employee_id': {'type': 'integer'},
                    'pickup_location': {'type': 'string'},
                    'dropoff_location': {'type': 'string'},
                    'pickup_time': {'type': 'string', 'format': 'date-time'},
                    'status': {'type': 'string'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
                }
            }
        },
        '404': {'description': 'Booking not found'}
    }
})
def get_booking(id):
    booking = Booking.query.get_or_404(id)
    return jsonify(booking.to_dict()), 200

@booking_bp.route('/booking/<int:id>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['Booking'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        '200': {'description': 'Booking deleted successfully'},
        '404': {'description': 'Booking not found'}
    }
})
def delete_booking(id):
    booking = Booking.query.get_or_404(id)
    db.session.delete(booking)
    db.session.commit()
    return jsonify(message='Booking deleted successfully'), 200

@booking_bp.route('/bookings/employee/<int:employee_id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Booking'],
    'parameters': [
        {
            'name': 'employee_id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        '200': {
            'description': 'List of bookings',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'employee_id': {'type': 'integer'},
                        'pickup_location': {'type': 'string'},
                        'dropoff_location': {'type': 'string'},
                        'pickup_time': {'type': 'string', 'format': 'date-time'},
                        'status': {'type': 'string'},
                        'created_at': {'type': 'string', 'format': 'date-time'},
                        'updated_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_bookings_by_employee(employee_id):
    bookings = Booking.query.filter_by(employee_id=employee_id).all()
    return jsonify([booking.to_dict() for booking in bookings]), 200
