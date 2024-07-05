from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from models.employee import Employee
from models.driver import Driver
from models.admin import Admin
from models.booking import Booking
from models.availability import Availability
from flasgger import swag_from
from utils.auth import admin_required

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/employees', methods=['GET'])
@jwt_required()
@admin_required
@swag_from({
    'tags': ['Admin'],
    'responses': {
        200: {
            'description': 'List of all employees',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'first_name': {'type': 'string'},
                        'last_name': {'type': 'string'},
                        'pickup_location': {'type': 'string'},
                        'phone_number': {'type': 'string'},
                        'email': {'type': 'string'},
                        'status': {'type': 'boolean'},
                        'created_at': {'type': 'string', 'format': 'date-time'},
                        'updated_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_employees():
    employees = Employee.query.all()
    return jsonify([employee.to_dict() for employee in employees]), 200

@admin_bp.route('/drivers', methods=['GET'])
@jwt_required()
@admin_required
@swag_from({
    'tags': ['Admin'],
    'responses': {
        200: {
            'description': 'List of all drivers',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'first_name': {'type': 'string'},
                        'last_name': {'type': 'string'},
                        'start_location': {'type': 'string'},
                        'phone_number': {'type': 'string'},
                        'email': {'type': 'string'},
                        'status': {'type': 'boolean'},
                        'cab_number': {'type': 'string'},
                        'manufacture': {'type': 'string'},
                        'model': {'type': 'string'},
                        'no_of_seats_available': {'type': 'integer'},
                        'created_at': {'type': 'string', 'format': 'date-time'},
                        'updated_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_drivers():
    drivers = Driver.query.all()
    return jsonify([driver.to_dict() for driver in drivers]), 200

@admin_bp.route('/admins', methods=['GET'])
@jwt_required()
@admin_required
@swag_from({
    'tags': ['Admin'],
    'responses': {
        200: {
            'description': 'List of all admins',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'first_name': {'type': 'string'},
                        'last_name': {'type': 'string'},
                        'phone_number': {'type': 'string'},
                        'email': {'type': 'string'},
                        'created_at': {'type': 'string', 'format': 'date-time'},
                        'updated_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_admins():
    admins = Admin.query.all()
    return jsonify([admin.to_dict() for admin in admins]), 200

@admin_bp.route('/admin/update-booking/<int:booking_id>', methods=['PUT'])
@jwt_required()
@admin_required
@swag_from({
    'tags': ['Admin'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'status': {'type': 'string'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Booking updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Booking not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_booking(booking_id):
    data = request.get_json()
    booking = Booking.query.get(booking_id)
    if not booking:
        return jsonify({'message': 'Booking not found'}), 404
    booking.status = data.get('status', booking.status)
    db.session.commit()
    return jsonify({'message': 'Booking updated successfully'}), 200

@admin_bp.route('/admin/update-availability/<int:availability_id>', methods=['PUT'])
@jwt_required()
@admin_required
@swag_from({
    'tags': ['Admin'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'available': {'type': 'boolean'}
                }
            }
        }
    ],
    'responses': {
        200: {
            'description': 'Availability updated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        },
        404: {
            'description': 'Availability not found',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def update_availability(availability_id):
    data = request.get_json()
    availability = Availability.query.get(availability_id)
    if not availability:
        return jsonify({'message': 'Availability not found'}), 404
    availability.available = data.get('available', availability.available)
    db.session.commit()
    return jsonify({'message': 'Availability updated successfully'}), 200

@admin_bp.route('/admin/reallocate-cabs', methods=['POST'])
@jwt_required()
@admin_required
@swag_from({
    'tags': ['Admin'],
    'responses': {
        200: {
            'description': 'Cabs reallocated successfully',
            'schema': {
                'type': 'object',
                'properties': {
                    'message': {'type': 'string'}
                }
            }
        }
    }
})
def reallocate_cabs():
    # Implement cab reallocation logic here
    return jsonify({'message': 'Cabs reallocated successfully'}), 200
