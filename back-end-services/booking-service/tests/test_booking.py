import unittest
from app import app, db
from models.booking import Booking

class BookingTestCase(unittest.TestCase):
    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_create_booking(self):
        response = self.app.post('/booking', json={
            'employee_id': 1,
            'pickup_location': 'A',
            'dropoff_location': 'B',
            'pickup_time': '2024-07-02T08:00:00'
        }, headers={'Authorization': 'Bearer <your_jwt_token>'})
        self.assertEqual(response.status_code, 201)
        self.assertIn('Booking created successfully', response.json['message'])

    def test_get_booking(self):
        booking = Booking(employee_id=1, pickup_location='A', dropoff_location='B', pickup_time='2024-07-02T08:00:00')
        with app.app_context():
            db.session.add(booking)
            db.session.commit()
        response = self.app.get(f'/booking/{booking.id}', headers={'Authorization': 'Bearer <your_jwt_token>'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['id'], booking.id)

if __name__ == '__main__':
    unittest.main()
