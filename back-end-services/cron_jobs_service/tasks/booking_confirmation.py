from celery_config import celery
from models import Booking, Employee, Driver
from datetime import datetime
from utils import notify_employee, notify_driver

@celery.task
def confirm_bookings():
    # Fetch all pending bookings for the day
    today = datetime.now().date()
    bookings = Booking.query.filter_by(date=today, status='pending').all()
    
    # Confirm bookings and notify employees and drivers
    for booking in bookings:
        booking.status = 'confirmed'
        notify_employee(booking.employee_id, booking.id)
        notify_driver(booking.driver_id, booking.id)
        
    db.session.commit()
