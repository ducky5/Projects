from flask_login import current_user

def logged_out():
    if current_user.is_authenticated:
        return False
    return True
