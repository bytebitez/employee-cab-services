from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from app import db
from models.route import Route
from flasgger import swag_from

route_bp = Blueprint('route', __name__)

@route_bp.route('/route', methods=['POST'])
@jwt_required()
@swag_from({
    'tags': ['Route'],
    'parameters': [
        {
            'name': 'body',
            'in': 'body',
            'required': True,
            'schema': {
                'type': 'object',
                'properties': {
                    'name': {'type': 'string'},
                    'start_location': {'type': 'string'},
                    'end_location': {'type': 'string'},
                    'distance': {'type': 'number'}
                }
            }
        }
    ],
    'responses': {
        '201': {'description': 'Route created successfully'},
        '400': {'description': 'Invalid data'}
    }
})
def create_route():
    data = request.get_json()
    route = Route(
        name=data.get('name'),
        start_location=data.get('start_location'),
        end_location=data.get('end_location'),
        distance=data.get('distance')
    )
    db.session.add(route)
    db.session.commit()
    return jsonify(message='Route created successfully', route=route.to_dict()), 201

@route_bp.route('/route/<int:id>', methods=['PUT'])
@jwt_required()
@swag_from({
    'tags': ['Route'],
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
                    'name': {'type': 'string'},
                    'start_location': {'type': 'string'},
                    'end_location': {'type': 'string'},
                    'distance': {'type': 'number'}
                }
            }
        }
    ],
    'responses': {
        '200': {'description': 'Route updated successfully'},
        '404': {'description': 'Route not found'}
    }
})
def update_route(id):
    route = Route.query.get_or_404(id)
    data = request.get_json()
    route.name = data.get('name', route.name)
    route.start_location = data.get('start_location', route.start_location)
    route.end_location = data.get('end_location', route.end_location)
    route.distance = data.get('distance', route.distance)
    db.session.commit()
    return jsonify(message='Route updated successfully', route=route.to_dict()), 200

@route_bp.route('/route/<int:id>', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Route'],
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
            'description': 'Route data',
            'schema': {
                'type': 'object',
                'properties': {
                    'id': {'type': 'integer'},
                    'name': {'type': 'string'},
                    'start_location': {'type': 'string'},
                    'end_location': {'type': 'string'},
                    'distance': {'type': 'number'},
                    'created_at': {'type': 'string', 'format': 'date-time'},
                    'updated_at': {'type': 'string', 'format': 'date-time'}
                }
            }
        },
        '404': {'description': 'Route not found'}
    }
})
def get_route(id):
    route = Route.query.get_or_404(id)
    return jsonify(route.to_dict()), 200

@route_bp.route('/route/<int:id>', methods=['DELETE'])
@jwt_required()
@swag_from({
    'tags': ['Route'],
    'parameters': [
        {
            'name': 'id',
            'in': 'path',
            'required': True,
            'type': 'integer'
        }
    ],
    'responses': {
        '200': {'description': 'Route deleted successfully'},
        '404': {'description': 'Route not found'}
    }
})
def delete_route(id):
    route = Route.query.get_or_404(id)
    db.session.delete(route)
    db.session.commit()
    return jsonify(message='Route deleted successfully'), 200

@route_bp.route('/routes', methods=['GET'])
@jwt_required()
@swag_from({
    'tags': ['Route'],
    'responses': {
        '200': {
            'description': 'List of routes',
            'schema': {
                'type': 'array',
                'items': {
                    'type': 'object',
                    'properties': {
                        'id': {'type': 'integer'},
                        'name': {'type': 'string'},
                        'start_location': {'type': 'string'},
                        'end_location': {'type': 'string'},
                        'distance': {'type': 'number'},
                        'created_at': {'type': 'string', 'format': 'date-time'},
                        'updated_at': {'type': 'string', 'format': 'date-time'}
                    }
                }
            }
        }
    }
})
def get_routes():
    routes = Route.query.all()
    return jsonify([route.to_dict() for route in routes]), 200
