from celery_config import celery
from models import Driver
from utils import notify_driver

@celery.task
def update_driver_availability():
    # Fetch all driver availabilities
    drivers = Driver.query.all()
    
    # Update driver statuses and notify drivers
    for driver in drivers:
        driver.status = 'available'
        notify_driver(driver.id)
        
    db.session.commit()
