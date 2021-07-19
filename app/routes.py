from app import app, db
from flask import render_template, redirect, url_for, flash
# from flask_login import current_user
from app.models import Assumption, User
from app.forms import RegisterForm, LoginForm

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/settings')
def profile():
    assumptions = Assumption.query.all()
    return render_template('settings.html', assumptions=assumptions)

@app.route('/register', methods=['GET', 'POST'])
def register_page():
    # prevent authenticated users from accessing this route
    # if current_user.is_authenticated:
    #     return redirect(url_for('/'))

    form = RegisterForm()
    if form.validate_on_submit():
        user_to_create = User(username=form.username.data,
                              email=form.email.data,
                              password=form.password1.data)
        db.session.add(user_to_create)
        db.session.commit()

        # log the user in after registration
        login_user(user_to_create)
        flash(f'Account created successfully! You are now logged in as \
        {user_to_create.username}', category='success')

        return redirect(url_for('/'))

    if form.errors != {}: # if the dict is not empty
        for err_msg in form.errors.values():
            flash(err_msg, category='error')

    return render_template('register.html', form=form)



# implement logout
