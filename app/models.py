from app import db, bcrypt
from flask_login import UserMixin

# association table(for many to many relationship)
users_to_assumptions = db.Table('users_to_assumptions',
                       db.Column('user_id', db.Integer,
                       db.ForeignKey('users.id')),
                       db.Column('assumption_id', db.Integer,
                       db.ForeignKey('assumptions.id')))

users_to_users = db.Table('users_to_users', db.Column('added_id', db.Integer,
                 db.ForeignKey('users.id')),
                 db.Column('adder_id', db.Integer, db.ForeignKey('users.id')))

# models
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=20), nullable=False, unique=True)
    email = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    gender = db.Column(db.String(length=6), nullable=False)

    # for many to many relationship between User and Assumption
    assumptions = db.relationship('Assumption', secondary=users_to_assumptions,
    backref=db.backref('users', lazy=True), lazy=True)

    # for many to many relationship between User and itself
    added_users = db.relationship('User', secondary=users_to_users,
                  primaryjoin=(users_to_users.c.added_id == id),
                  secondaryjoin=(users_to_users.c.adder_id == id),
                  backref=db.backref('adder_users', lazy=True), lazy=True)

    def __repr__(self):
        return f'<{self.username} {self.id}>'

    @property
    def password(self):
        return self.password

    @password.setter
    def password(self, plain_text_password):
        self.password_hash = (bcrypt.generate_password_hash(plain_text_password)
        .decode('utf-8'))

    def check_password_hash(self, tried_password):
        return bcrypt.check_password_hash(self.password_hash, tried_password)

class Assumption(db.Model):
    __tablename__ = 'assumptions'

    id = db.Column(db.Integer(), primary_key=True)
    content = db.Column(db.String())
