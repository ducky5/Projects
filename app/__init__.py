from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pmt.db'
app.config['SECRET_KEY'] = 'd04bba2df881c414015714e3'

# database
db = SQLAlchemy(app)

# bcrypt(encryption)
bcrypt = Bcrypt(app)

from app import routes
