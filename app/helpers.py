from flask_login import current_user
from app.models import User, Assumption
from math import round

# to check if user is logged out
def logged_out():
    if current_user.is_authenticated:
        return False
    return True

# a standard for password validation
def password_to_standard(password):
    num_of_upper = 0
    num_of_lower = 0
    num_of_numeric = 0
    for char in password:
        # standard 1: 2 lowercase, 2 uppercase
        if num_of_upper < 2:
            if char.isupper():
                num_of_upper += 1
        if num_of_lower < 2:
            if char.islower():
                num_of_lower += 1
        # standard 2: 1 numerical digit
        if num_of_numeric < 1:
            if char.isnumeric():
                num_of_numeric += 1

    if num_of_lower == num_of_upper == 2 and num_of_numeric == 1:
        return True
    else:
        return False

# function to calculate compatibility of two users(current_user and other)
def calculate_compatibility(userid):
    commons = 0
    user = User.query.filter_by(id=userid).first()
    user_length = len(user.assumptions)
    main_length = len(current_user.assumptions)

    for assumption in current_user.assumptions:
        if assumption in user.assumptions:
            commons += 1

    if main_length > user_length:
        return round((commons/main_length) * 100, 2)
    elif user_length > main_length:
        return round((commons/user_length) * 100, 2)
    elif user_length == 0 or main_length == 0:
        return round(0, 2)
    else:
        return round((commons/main_length) * 100, 2)
