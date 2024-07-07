from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flasgger import Swagger
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins
#CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow only your frontend

db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)
swagger = Swagger(app)

from routes.route import route_bp

app.register_blueprint(route_bp)

if __name__ == '__main__':
    app.run(debug=True)
