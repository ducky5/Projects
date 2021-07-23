from app import app, db, login_manager
from flask import render_template, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from app.models import Assumption, User
from app.forms import RegisterForm, LoginForm
from app.helpers import logged_out
import user_loader

@app.route('/')
@login_required
def home():
    users = User.query.all()
    return render_template('home.html', users=users)

@app.route('/settings')
@login_required
def settings():
    assumptions = Assumption.query.all()
    return render_template('settings.html', assumptions=assumptions)

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    if not logged_out():
        return redirect(url_for('home'))

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
        return redirect(url_for('home'))

    form = LoginForm()
    if form.validate_on_submit():
        attempted_user = (User.query.filter_by(username=form.username.data)
        .first())
        # if attempted User is not None
        if attempted_user and attempted_user.check_password_hash(form.password
        .data):
            login_user(attempted_user)
            return redirect(url_for('home'))

    return render_template('login.html', form=form)

@app.route('/logout')
def logout_page():
    logout_user()
    return redirect(url_for('login_page'))

@app.route('/adduser/<userid>')
def add_user(userid):
    if int(userid) != current_user.id:
        user_to_add = User.query.filter_by(id=userid).first()

        if user_to_add not in current_user.added_users and user_to_add != None:
            current_user.added_users.append(user_to_add)
            db.session.add(current_user)
            db.session.commit()

            return 'success'

        return 'failure'

    return 'failure'

@app.route('/unadduser/<userid>')
def unadd_user(userid):
    if int(userid) != current_user.id:
        user_to_unadd = User.query.filter_by(id=userid).first()

        if user_to_unadd in current_user.added_users and user_to_unadd != None:
            current_user.added_users.remove(user_to_unadd)
            db.session.add(current_user)
            db.session.commit()

            return 'success'

        return 'failure'

    return 'failure'
