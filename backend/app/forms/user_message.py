from flask_wtf import FlaskForm
from wtforms import StringField, EmailField, PasswordField, DateField, FileField, SelectMultipleField
from wtforms.validators import DataRequired, Email, ValidationError, URL, Length

class UserMessage(FlaskForm):
    content = StringField("Content", validators=[DataRequired(), Length(min=1, max=1000)])
