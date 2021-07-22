from flask_login import current_user

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

# a standard for username validation
def username_to_standard(username):
    if username.isalnum(): # username has to be alphanumeric
        return True
    else:
        return False
