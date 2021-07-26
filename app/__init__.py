from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_socketio import SocketIO
from threading import Lock

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pmt.db'
app.config['SECRET_KEY'] = 'd04bba2df881c414015714e3'

# database
db = SQLAlchemy(app)

# bcrypt(encryption)
bcrypt = Bcrypt(app)

# flask-socketio
async_mode = None
thread = None
thread_lock = Lock()
socketio = SocketIO(app, async_mode=async_mode)

# login manager
login_manager = LoginManager(app)

# supply location of login page
login_manager.login_view = 'login_page'

from app import routes
