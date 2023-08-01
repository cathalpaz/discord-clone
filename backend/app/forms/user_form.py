from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, DateField, FileField
from wtforms.validators import DataRequired, ValidationError, URL, Length


def image_validator(form, field):
    if not (form.data['avatar'].endswith('.jpg') or form.data["avatar"].endswith(".png") or form.data["avatar"].endswith('.jpeg')):
        raise ValidationError("Invalid photo")


def email_validator(form, field):
    if "@" not in field.data:
        raise ValidationError("Must be a valid email")


class UserForm(FlaskForm):
    username = StringField("Username", validators=[
                           DataRequired(), Length(min=4, max=50)])
    password = PasswordField("Password", validators=[
                             DataRequired(), Length(min=4, max=50)])
    email = EmailField("Email", validators=[DataRequired()])
    birthday = StringField("Birthday", validators=[DataRequired()])
    banner_color = StringField("Banner Color", validators=[DataRequired()])
    bio = StringField("Bio")
    pronouns = StringField("Pronouns", validators=[DataRequired()])
    file = FileField("Avatar")
