from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired


class ChannelForm(FlaskForm):
    type = StringField("Type", validators=[DataRequired()])
    name = StringField("Name", validators=[DataRequired()])
