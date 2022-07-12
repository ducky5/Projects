from app import app, db, login_manager
from flask import render_template, redirect, url_for, request
from flask_login import login_user, logout_user, login_required, current_user
from app.models import Assumption, User
from app.forms import RegisterForm, LoginForm
from app.helpers import logged_out, calculate_compatibility
import user_loader

@app.route('/')
@login_required
def home_page():
    users = User.query.limit(25)
    return render_template('home.html', users=users,
    calculate_compatibility=calculate_compatibility)

@app.route('/assumptions')
@login_required
def assumptions_page():
    assumptions = Assumption.query.limit(25)
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
                              gender=form.gender.data,
                              facebook=form.facebook.data,
                              instagram=form.instagram.data,
                              twitter=form.twitter.data,
                              reddit=form.reddit.data,
                              discord=form.discord.data)
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
            # add user to current_user
            current_user.added_users.append(user_to_add)
            db.session.add(current_user)
            # save
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

@app.route('/load_more', methods=['POST'])
@login_required
def load_more():
    id_of_latest_listing = request.json['id_of_latest_listing']
    load = db.session.query(User).filter(User.id!=current_user.id,
    User.id>id_of_latest_listing).limit(25)
    json_load = {'load': []}
    for user in load:
        if user not in current_user.added_users:
            json_load['load'].append([user.serialize,
            calculate_compatibility(user.id)])

    return json_load

@app.route('/load_more_assumptions', methods=['POST'])
@login_required
def load_more_assumptions():
    id_of_latest_listing = request.json['id_of_latest_listing']
    load = db.session.query(Assumption).filter(
    Assumption.id>id_of_latest_listing).limit(25)
    json_load = {'load': []}
    for assumption in load:
        if assumption not in current_user.assumptions:
            json_load['load'].append(assumption.serialize)

    return json_load

@app.route('/added_users')
@login_required
def addedusers_page():
    return render_template('added_users.html',
    calculate_compatibility=calculate_compatibility)
