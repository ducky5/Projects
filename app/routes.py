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
            # add user to current_user
            current_user.added_users.append(user_to_add)
            db.session.add(current_user)
            # add current_user to user
            user_to_add.added_users.append(current_user)
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

# @app.route('/unaddassumption', methods=['POST'])
# @login_required
# def unadd_assumption():
#     assumption_id = int(request.json['id'])
#     assumption_to_unadd = Assumption.query.filter_by(id=assumption_id).first()
#
#     if (assumption_to_unadd in current_user.assumptions and assumption_to_unadd
#     is not None):
#         current_user.assumptions.remove(assumption_to_unadd)
#         db.session.add(current_user)
#         db.session.commit()
#
#         return 'success'
#
#     return 'failure'

# @app.route('/chat/<int:recipient_id>/')
# @login_required
# def chat_page(recipient_id):
#     if recipient_id == current_user.id or User.query.filter_by(id=recipient_id)\
#     .first() is None:
#         return 'failure'
#
#     recipient = User.query.filter_by(id=recipient_id).first()
#     try:
#         latest_current_user_msg = Message.query.filter_by(
#         sender_id=current_user.id, recipient_id=recipient_id)[-1]
#     except IndexError:
#         conversation_initialization_message = f'Hi, my name is \
#         {User.query.filter_by(id=current_user.id).first().username}! \
#         I\'ll be in touch with u soon(Hopefully)'
#
#         latest_current_user_msg = Message(sender_id=current_user.id,
#         recipient_id=recipient_id, is_auto_generated=True,
#         message=conversation_initialization_message)
#         db.session.add(latest_current_user_msg)
#         db.session.commit()
#
#         latest_current_user_msg = Message.query.filter_by(
#         sender_id=current_user.id, recipient_id=recipient_id)[-1]
#
#     try:
#         latest_recipient_msg = Message.query.filter_by(sender_id=recipient_id,
#         recipient_id=current_user.id)[-1]
#     except IndexError:
#         conversation_initialization_message = f'Hi, my name is \
#         {User.query.filter_by(id=recipient_id).first().username}! \
#         I\'ll be in touch with u soon(Hopefully)'
#
#         latest_recipient_msg = Message(sender_id=recipient_id,
#         recipient_id=current_user.id, is_auto_generated=True,
#         message=conversation_initialization_message)
#         db.session.add(latest_recipient_msg)
#         db.session.commit()
#
#         latest_recipient_msg = Message.query.filter_by(sender_id=recipient_id,
#         recipient_id=current_user.id)[-1]
#
#     return render_template('chat.html', recipient_username=recipient.username,
#     recipient_gender=recipient.gender, recipient_id=recipient_id,
#     latest_current_user_msg=latest_current_user_msg,
#     latest_recipient_msg=latest_recipient_msg)

# @app.route('/save-message', methods=['POST'])
# @login_required
# def save_message():
#     recipient_id = request.json['recipient_id']
#     recipient = User.query.filter_by(id=recipient_id).first()
#     message = request.json['message']
#
#     if recipient_id != current_user.id and recipient and message:
#         message = Message(sender_id=current_user.id, recipient_id=recipient_id,
#                           message=message)
#         db.session.add(message)
#         # append message to recipient's list of messages
#         recipient.messages_to_be_received.append(message)
#         db.session.commit()
#
#         return 'success'
#
#     return 'failure'

# event triggered by client upon connection, purpose: get latest message from
# database, emit it back to client
# @socketio.event
# def send_latest_msg_to_client(recipient_id):
#     while True:
#         socketio.sleep(.1)
#         recipient_messages = Message.query.filter_by(sender_id=recipient_id,
#         recipient_id=current_user.id).first()
#         if User.query.filter_by(id=recipient_id).first().gender == 'female':
#             recipient_pronoun = 'Her'
#         else:
#             recipient_pronoun = 'Him'
#
#         if recipient_messages is not None:
#             try:
#                 latest_message = {
#                     'message': (Message.query.filter_by(sender_id=recipient_id,
#                     recipient_id=current_user.id, is_auto_generated=False)[-1]
#                     .message),
#                     'id': Message.query.filter_by(sender_id=recipient_id,
#                     recipient_id=current_user.id, is_auto_generated=False)[-1].id,
#                     'recipient_pronoun': recipient_pronoun
#                 }
#             # makes sure that autogenerated messages are overwritten on client
#             except IndexError:
#                 latest_message = {
#                     'message': (Message.query.filter_by(sender_id=recipient_id,
#                     recipient_id=current_user.id)[-1]
#                     .message),
#                     'id': Message.query.filter_by(sender_id=recipient_id,
#                     recipient_id=current_user.id)[-1].id,
#                     'recipient_pronoun': '[AUTO-GENERATED]'
#                 }
#             emit('get_latest_msg', latest_message)
#         else:
#             conversation_initialization_message = f'Hi, my name is \
#             {User.query.filter_by(id=recipient_id).first().username}! \
#             I\'ll be in touch with u soon(Hopefully)'
#             # create message
#             message = Message(sender_id=recipient_id,
#             recipient_id=current_user.id,
#             message=conversation_initialization_message, is_auto_generated=True)
#             # save to database
#             db.session.add(message)
#             db.session.commit()
#
#             latest_message = {
#                 'message': message.message,
#                 'id': message.id,
#                 'recipient_pronoun': '[AUTO-GENERATED]'
#             }
#
#             emit('get_latest_msg', latest_message)

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
    # current_user.messages_to_be_received.reverse()
    return render_template('added_users.html',
    calculate_compatibility=calculate_compatibility)
