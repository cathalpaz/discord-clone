from flask_wtf import FlaskForm
from wtforms import StringField, FileField
from wtforms.validators import DataRequired, ValidationError, URL

def image_validator(form, field):
    if not form.data["avatar"].endswith("jpg", "png", "jpeg"):
        raise ValidationError("Needs to end with jpg, png, jpeg")
    elif URL(form.data, message="Not a valid URL"):
        raise ValidationError("Not a valid URL")

class ServerProfile(FlaskForm):
    name = StringField("Server Name", validators=[DataRequired()])
    avatar = FileField("Avatar", validators=[DataRequired(),image_validator])
