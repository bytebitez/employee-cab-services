import os
from celery import Celery

celery = Celery(
    'cron_jobs_service',
    broker=os.getenv('CELERY_BROKER_URL', 'redis://localhost:6379/0'),
    backend=os.getenv('CELERY_RESULT_BACKEND', 'redis://localhost:6379/0')
)

celery.conf.update(
    timezone='UTC',
    enable_utc=True,
    beat_schedule={
        'confirm_bookings': {
            'task': 'tasks.booking_confirmation.confirm_bookings',
            'schedule': {'hour': 8, 'minute': 30},
        },
        'update_driver_availability': {
            'task': 'tasks.driver_availability.update_driver_availability',
            'schedule': {'hour': 8, 'minute': 0},
        },
        'optimize_seat_allocation': {
            'task': 'tasks.seat_allocation.optimize_seat_allocation',
            'schedule': {'hour': 8, 'minute': 15},
        }
    }
)
