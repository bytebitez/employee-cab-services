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

from routes.booking import booking_bp

app.register_blueprint(booking_bp)

if __name__ == '__main__':
    app.run(debug=True)
