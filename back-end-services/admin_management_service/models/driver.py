from datetime import datetime
from app import db

class Driver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    start_location = db.Column(db.String(100), nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    status = db.Column(db.Boolean, default=False)
    cab_number = db.Column(db.String(20), nullable=False)
    manufacture = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    no_of_seats_available = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'start_location': self.start_location,
            'phone_number': self.phone_number,
            'email': self.email,
            'status': self.status,
            'cab_number': self.cab_number,
            'manufacture': self.manufacture,
            'model': self.model,
            'no_of_seats_available': self.no_of_seats_available,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
