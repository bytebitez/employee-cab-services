from celery_config import celery
from models import Booking, Driver
from utils import allocate_seats, notify_employee, notify_driver

@celery.task
def optimize_seat_allocation():
    # Fetch all bookings and availabilities
    bookings = Booking.query.filter_by(status='confirmed').all()
    drivers = Driver.query.filter_by(status='available').all()
    
    # Run optimization algorithm
    allocations = allocate_seats(bookings, drivers)
    
    # Allocate seats and update database
    for allocation in allocations:
        booking = allocation['booking']
        driver = allocation['driver']
        booking.driver_id = driver.id
        notify_employee(booking.employee_id, booking.id)
        notify_driver(driver.id, booking.id)
        
    db.session.commit()
