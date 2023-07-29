from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Length


class ServerForm(FlaskForm):
    name = StringField("Name", validators=[
                       DataRequired(), Length(min=1, max=255)])
    avatar = StringField("Avatar", validators=[Length(min=1, max=255)])
    public = BooleanField("Public")
