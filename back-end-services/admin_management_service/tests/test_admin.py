import unittest
from app import app, db
from models.employee import Employee
from models.driver import Driver
from models.admin import Admin
from models.booking import Booking
from models.availability import Availability

class AdminTestCase(unittest.TestCase):
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

    def test_get_employees(self):
        employee = Employee(first_name='John', last_name='Doe', pickup_location='Location A', phone_number='1234567890', email='john.doe@example.com')
        with app.app_context():
            db.session.add(employee)
            db.session.commit()
        response = self.app.get('/employees', headers={'Authorization': 'Bearer <your_jwt_token>'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json[0]['email'], 'john.doe@example.com')

    # Add more tests for other endpoints

if __name__ == '__main__':
    unittest.main()
