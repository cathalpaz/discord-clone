from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from ..models import User
from sqlalchemy import or_


def user_exists(form, field):
    # Checking if user exists
    credenitals = field.data
    user = User.query.filter(or_(
        User.email == credenitals,
        User.username == credenitals)).first()
    if not user:
        raise ValidationError('credentials provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credentials = form.data['credentials']
    user = User.query.filter(or_(
        User.email == credentials,
        User.username == credentials)).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    credentials = StringField('credentials', validators=[
                              DataRequired(), user_exists])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
