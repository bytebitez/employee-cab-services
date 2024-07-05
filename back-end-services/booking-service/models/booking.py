from datetime import datetime
from app import db

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, nullable=False)
    pickup_location = db.Column(db.String(100), nullable=False)
    dropoff_location = db.Column(db.String(100), nullable=False)
    pickup_time = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'pickup_location': self.pickup_location,
            'dropoff_location': self.dropoff_location,
            'pickup_time': self.pickup_time,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
