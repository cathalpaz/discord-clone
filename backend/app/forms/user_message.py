from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Length

class UserMessage(FlaskForm):
    content = StringField("Content", validators=[DataRequired(), Length(min=1, max=1000)])
