from datetime import datetime
from app import db

class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, nullable=False)
    available_date = db.Column(db.Date, nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(20), nullable=False, default='available')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'driver_id': self.driver_id,
            'available_date': self.available_date,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'status': self.status,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
