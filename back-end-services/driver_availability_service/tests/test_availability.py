import unittest
from app import app, db
from models.availability import Availability

class AvailabilityTestCase(unittest.TestCase):
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

    def test_create_availability(self):
        response = self.app.post('/availability', json={
            'driver_id': 1,
            'available_date': '2024-07-02',
            'start_time': '08:00:00',
            'end_time': '17:00:00'
        }, headers={'Authorization': 'Bearer <your_jwt_token>'})
        self.assertEqual(response.status_code, 201)
        self.assertIn('Availability created successfully', response.json['message'])

    def test_get_availability(self):
        availability = Availability(driver_id=1, available_date='2024-07-02', start_time='08:00:00', end_time='17:00:00')
        with app.app_context():
            db.session.add(availability)
            db.session.commit()
        response = self.app.get(f'/availability/{availability.id}', headers={'Authorization': 'Bearer <your_jwt_token>'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['id'], availability.id)

if __name__ == '__main__':
    unittest.main()
