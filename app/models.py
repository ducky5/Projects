from app import db, bcrypt
from flask_login import UserMixin

class Assumption(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    content = db.Column(db.String())

class User(db.Model, UserMixin):
    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=20), nullable=False, unique=True)
    email = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    gender = db.Column(db.String(length=6), nullable=False)

    def __repr__(self):
        return f'[{self.username} {self.id}]'

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = (bcrypt.generate_password_hash(plain_text_password)
        .decode('utf-8'))

    def check_password_hash(self, tried_password):
        return bcrypt.check_password_hash(self.password_hash, tried_password)
