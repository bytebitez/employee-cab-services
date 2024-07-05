from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, nullable=False)
    driver_id = db.Column(db.Integer, nullable=True)
    date = db.Column(db.Date, nullable=False)
    status = db.Column(db.String, default='pending')

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    pickup_location = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    status = db.Column(db.Boolean, default=False)

class Driver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    start_location = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    status = db.Column(db.Boolean, default=False)
    cab_number = db.Column(db.String, nullable=False)
    manufacture = db.Column(db.String, nullable=False)
    model = db.Column(db.String, nullable=False)
    no_of_seats_available = db.Column(db.Integer, nullable=False)
