from app import db

class Assumption(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    content = db.Column(db.String())
    btn_status = db.Column(db.String(), default='Add')
