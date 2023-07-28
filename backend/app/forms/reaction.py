from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired

class Reaction(FlaskForm):
    emoji = StringField("Reaction", validators=[DataRequired()])
