import unittest
from app import app, db
from models.route import Route

class RouteTestCase(unittest.TestCase):
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

    def test_create_route(self):
        response = self.app.post('/route', json={
            'name': 'Route 1',
            'start_location': 'Location A',
            'end_location': 'Location B',
            'distance': 10.0
        }, headers={'Authorization': 'Bearer <your_jwt_token>'})
        self.assertEqual(response.status_code, 201)
        self.assertIn('Route created successfully', response.json['message'])

    def test_get_route(self):
        route = Route(name='Route 1', start_location='Location A', end_location='Location B', distance=10.0)
        with app.app_context():
            db.session.add(route)
            db.session.commit()
        response = self.app.get(f'/route/{route.id}', headers={'Authorization': 'Bearer <your_jwt_token>'})
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json['id'], route.id)

if __name__ == '__main__':
    unittest.main()
