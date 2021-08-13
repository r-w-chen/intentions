from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def email_exists(form, field):
    print("Checking if email exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("This email is already registered.")

def username_exists(form, field):
    print("Checking if username is in use")
    username = field.data
    user = User.query.filter(User.username == username).first() 
    if user:
        raise ValidationError("This username is taken.")

def password_check(form, field):
    print("Checking for minimum password requirements")
    password = field.data
    if len(password) < 6:
        raise ValidationError("Password must be at least 6 characters.")

class SignUpForm(FlaskForm):
    username = StringField('username', validators=[DataRequired('Username field is required.'), username_exists])
    email = StringField('email', validators=[DataRequired('Enter a valid email.'), email_exists])
    password = StringField('password', validators=[DataRequired(), password_check])

# It tries to run the SQL query if I have a username that exists BUT it's registered with a different email
# Current validator only uses the email to check if a user exists
# But it doesn't check for same username/different email 