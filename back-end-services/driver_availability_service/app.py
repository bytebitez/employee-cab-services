from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flasgger import Swagger
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)
swagger = Swagger(app)

from routes.availability import availability_bp
from routes.pickup import pickup_bp

app.register_blueprint(availability_bp)
app.register_blueprint(pickup_bp)

if __name__ == '__main__':
    app.run(debug=True)
