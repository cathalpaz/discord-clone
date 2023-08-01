import os
from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField, FileField
from wtforms.validators import DataRequired, Length, ValidationError


class FileSize(object):
    def __init__(self, max_size_mb):
        self.max_size_mb = max_size_mb

    def __call__(self, form, field):
        if field.data:
            file_size = os.fstat(field.data.fileno()).st_size
            if file_size > self.max_size_mb * 1024 * 1024:
                raise ValidationError(
                    f'File size exceeds max ({self.max_size_mb}MB)')


class FileType(object):
    def __init__(self, allowed_types):
        self.allowed_types = allowed_types

    def __call__(self, form, field):
        if field.data:
            file_name = field.data.filename
            if not ('.' in file_name and file_name.rsplit('.', 1)[1].lower() in self.allowed_types):
                raise ValidationError(
                    'Invalid file type. Only %s files are allowed.' % ', '.join(self.allowed_types))


class ServerForm(FlaskForm):
    name = StringField("Name", validators=[
                       DataRequired(), Length(min=1, max=255)])
    public = BooleanField("Public")
    file = FileField("File", validators=[
        FileSize(2),
        FileType(['jpg', 'jpeg', 'png'])
    ])
