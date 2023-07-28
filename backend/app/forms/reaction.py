from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, DateField, FileField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Length

class Reaction(FlaskForm):
    emoji = StringField("Reaction", validators=[DataRequired()])
