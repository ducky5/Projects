from app import app, db, login_manager
from flask import render_template, redirect, url_for, request
from flask_login import login_user, logout_user, login_required, current_user
from app.models import Assumption, User, Message
from app.forms import RegisterForm, LoginForm
from app.helpers import logged_out, calculate_compatibility
import user_loader

@app.route('/')
@login_required
def home_page():
    users = User.query.all()
    return render_template('home.html', users=users,
    calculate_compatibility=calculate_compatibility)

@app.route('/settings')
@login_required
def assumptions_page():
    assumptions = Assumption.query.all()
    return render_template('assumptions.html', assumptions=assumptions)

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    if not logged_out():
        return redirect(url_for('home_page'))

    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = User(username=form.username.data,
                              email=form.email.data,
                              password=form.password1.data,
                              age=form.age.data,
                              gender=form.gender.data)
        db.session.add(user_to_create)
        db.session.commit()

        # take new user to login page after registration
        return redirect(url_for('login_page'))

    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login_page():
    if not logged_out():
        return redirect(url_for('home_page'))

    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = (User.query.filter_by(username=form.username.data)
        .first())
        # if attempted User is not None
        if attempted_user and attempted_user.check_password_hash(form.password
        .data):
            login_user(attempted_user)
            return redirect(url_for('home_page'))

    return render_template('login.html', form=form)

@app.route('/logout')
@login_required
def logout_page():
    logout_user()
    return redirect(url_for('login_page'))

@app.route('/adduser', methods=['POST'])
@login_required
def add_user():
    user_id = int(request.json['id'])

    if user_id != current_user.id:
        user_to_add = User.query.filter_by(id=user_id).first()

        if (user_to_add not in current_user.added_users and user_to_add is not
        None):
            current_user.added_users.append(user_to_add)
            db.session.add(current_user)
            db.session.commit()

            return 'success'

        return 'failure'

    return 'failure'


@app.route('/unadduser', methods=['POST'])
@login_required
def unadd_user():
    user_id = int(request.json['id'])

    if user_id != current_user.id:
        user_to_unadd = User.query.filter_by(id=user_id).first()

        if (user_to_unadd in current_user.added_users and user_to_unadd is not
        None):
            current_user.added_users.remove(user_to_unadd)
            db.session.add(current_user)
            db.session.commit()

            return 'success'

        return 'failure'

    return 'failure'

@app.route('/addassumption', methods=['POST'])
@login_required
def add_assumption():
    assumption_id = int(request.json['id'])
    assumption_to_add = Assumption.query.filter_by(id=assumption_id).first()

    if (assumption_to_add not in current_user.assumptions and assumption_to_add
    is not None):
        current_user.assumptions.append(assumption_to_add)
        db.session.add(current_user)
        db.session.commit()

        return 'success'

    return 'failure'

@app.route('/unaddassumption', methods=['POST'])
@login_required
def unadd_assumption():
    assumption_id = int(request.json['id'])
    assumption_to_unadd = Assumption.query.filter_by(id=assumption_id).first()

    if (assumption_to_unadd in current_user.assumptions and assumption_to_unadd
    is not None):
        current_user.assumptions.remove(assumption_to_unadd)
        db.session.add(current_user)
        db.session.commit()

        return 'success'

    return 'failure'

@app.route('/chat/user/<int:recipient_id>')
@login_required
def chat_page(recipient_id):
    if recipient_id == current_user.id:
        return 'failure'

    recipient = User.query.filter_by(id=recipient_id).first()

    if recipient is not None:
        messages = []
        # search the entire Message table for messages with either of the users
        # as sender and either as recipient (algorithm is linear search :/)
        for message in Message.query.all():
            if ((message.sender_id == recipient.id or message.sender_id ==
            current_user.id) and (message.recipient_id == recipient.id or
            message.recipient_id == current_user.id)):
                messages.append(message)

        return render_template('chat.html', messages=messages,
        recipient_username=recipient.username,
        recipient_gender=recipient.gender, recipient_id=recipient_id)

    return 'failure'

@app.route('/save-message', methods=['POST'])
@login_required
def save_message():
    recipient_id = request.json['recipient_id']
    recipient = User.query.filter_by(id=recipient_id).first()
    message = request.json['message']

    if recipient_id != current_user.id and recipient and message:
        message = Message(sender_id=current_user.id, recipient_id=recipient_id,
                          message=message)
        db.session.add(message)
        db.session.commit()

        return 'success'

    return 'failure'
