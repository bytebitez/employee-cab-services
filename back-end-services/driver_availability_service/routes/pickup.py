from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from models.pickup import Pickup
from flasgger import swag_from

pickup_bp = Blueprint('pickup', __name__)

@pickup_bp.route('/pickups/driver/<int:driver_id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Pickup'],
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
            'description': 'List of pickups',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'driver_id': {'type': 'integer'},
                        'booking_id': {'type': 'integer'},
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
def get_pickups_by_driver(driver_id):
    pickups = Pickup.query.filter_by(driver_id=driver_id).all()
    return jsonify([pickup.to_dict() for pickup in pickups]), 200
