from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import DataRequired


class ServerInviteForm(FlaskForm):
    action = SelectField("Action", choices=[
        ("ACCEPTED", "ACCEPTED"),
        ("REJECTED", "REJECTED")
    ], validators=[DataRequired()])
