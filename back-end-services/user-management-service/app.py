from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_mail import Mail
from flasgger import Swagger
from config import Config

app = Flask(__name__)
app.config.from_object(Config)

db = SQLAlchemy(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)
mail = Mail(app)
swagger = Swagger(app)

from routes.auth import auth_bp
from routes.user import user_bp

app.register_blueprint(auth_bp)
app.register_blueprint(user_bp)

if __name__ == '__main__':
    app.run(debug=True)
