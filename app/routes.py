from app import app
from flask import render_template
from app.models import Assumption

# temporary
class User:
    def __init__(self, username, gender, comp, age):
        self.username = username
        self.gender = gender
        self.comp = comp
        self.age = age

@app.route('/')
@app.route('/home')
def home():
    users = [
        User('Yassir', 'male', 72, 18),
        User('Kayle', 'female', 5, 19),
        User('Alessa', 'female', 71, 28),
        User('Jeff', 'male', 12, 71),
        User('faysal', 'male', 99.2, 22),
        User('Ellie', 'female', 82, 22)

    ]
    return render_template('home.html', users=users)

@app.route('/settings')
def profile():
    assumptions = Assumption.query.all()
    return render_template('settings.html', assumptions=assumptions)

# implement logout
