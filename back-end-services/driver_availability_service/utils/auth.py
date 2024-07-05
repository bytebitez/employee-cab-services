from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from functools import wraps
from flask import jsonify

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()
        claims = get_jwt_identity()
        if not claims.get('is_admin', False):
            return jsonify(msg='Admins only!'), 403
        return fn(*args, **kwargs)
    return wrapper
