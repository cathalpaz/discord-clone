from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, DateField, FileField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Length

def image_validator(form, field):
    if not form.data["avatar"].endswith("jpg", "png", "jpeg"):
        raise ValidationError("Needs to end with jpg, png, jpeg")
    elif URL(form.data, message="Not a valid URL"):
        raise ValidationError("Not a valid URL")

def email_validator(form, field):
    if "@" not in  field.data:
        raise ValidationError("Must be a valid email")

class UserForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(min=4, max=50)])
    password = PasswordField("Password", validators=[DataRequired(), Length(min=4, max=50)])
    email = EmailField("Email", validators=[DataRequired()])
    birthday = DateField("Birthday", validators=[DataRequired()])
    banner_color = StringField("Banner Color", validators=[DataRequired()])
    bio = StringField("Bio", validators=[DataRequired()])
    pronouns = SelectMultipleField("Pronouns", validators=[DataRequired()])
    avatar = FileField("Avatar", validators=[DataRequired(),image_validator])
