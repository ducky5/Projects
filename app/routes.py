from app import app
from flask import render_template

# temporary
class Questions:
    def __init__(self, content, id, btn_status):
        self.content = content
        self.id = id
        self.btn_status = btn_status

@app.route('/')
@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/profile')
def profile():
    return render_template('profile.html')

@app.route('/learn')
def learn():
    questions = [
        Questions("You like music", "learn-card-1", "correct"),
        Questions("You like epicness", "learn-card-2", "correct"),
        Questions("You like epicnessw", "learn-card-3", "correct"),
        Questions("You Love", "learn-card-4", "correct")


    ]
    return render_template('learn.html', questions=questions)

# implement logout
