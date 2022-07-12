from app import db, bcrypt
from flask_login import UserMixin

# association tables(for many to many relationship)
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

    # # for one to many relationship between User and Message
    # messages_to_be_received = db.relationship('Message', backref='receiver',
    # lazy=True)

    def __repr__(self):
        return f'<{self.username} {self.id}>'

    @property
    def serialize(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'password_hash': self.password_hash,
            'age': self.age,
            'gender': self.gender,
            'assumptions': self.assumptions,
            'added_users': self.added_users
        }

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
    content_type = db.Column(db.String())

    def __repr__(self):
        return f'<{self.content_type} {self.id}>'

    @property
    def serialize(self):
        return {
            'id': self.id,
            'content': self.content,
            'content_type': self.content_type
        }

# class Message(db.Model):
#     __tablename__ = 'messages'
#
#     id = db.Column(db.Integer(), primary_key=True)
#     sender_id = db.Column(db.Integer(), nullable=False)
#     recipient_id = db.Column(db.Integer(), nullable=False)
#     message = db.Column(db.String(), nullable=False)
#     is_auto_generated = db.Column(db.Boolean, default=False, nullable=False)
#
#     # for one to many relationship between User and Message
#     recipient = db.Column(db.Integer(), db.ForeignKey('users.id'))
#
#     @property
#     def serialize(self):
#         return {
#             'id': self.id,
#             'sender_id': self.sender_id,
#             'recipient_id': self.recipient_id,
#             'message': self.message,
#             'is_auto_generated': self.is_auto_generated,
#         }
