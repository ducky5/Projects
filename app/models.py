from app import db, bcrypt
from flask_login import UserMixin

# association table(for many to many relationship)
users_to_assumptions = db.Table('users_to_assumptions',
                       db.Column('user_id', db.Integer,
                       db.ForeignKey('users.id'), primary_key=True),
                       db.Column('assumption_id', db.Integer,
                       db.ForeignKey('assumptions.id'), primary_key=True))

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer(), primary_key=True)
    username = db.Column(db.String(length=20), nullable=False, unique=True)
    email = db.Column(db.String(length=50), nullable=False, unique=True)
    password_hash = db.Column(db.String(length=60), nullable=False)
    age = db.Column(db.Integer(), nullable=False)
    gender = db.Column(db.String(length=6), nullable=False)

    # for many to many relationship between User and Assumption through
    assumptions = db.relationship('Assumption', secondary=users_to_assumptions,
    backref=db.backref('users', lazy=True), lazy=True)

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
