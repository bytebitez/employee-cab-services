from datetime import datetime
from app import db

class Availability(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'), nullable=False)
    available = db.Column(db.Boolean, nullable=False)
    date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'driver_id': self.driver_id,
            'available': self.available,
            'date': self.date,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
