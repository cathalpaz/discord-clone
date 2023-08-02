from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from ..models import User, db
from ..forms.user_form import UpdateUserForm
from ..errors import NotFoundError, ForbiddenError
from ..utils.s3 import s3
from ..utils.validate_errors import validation_errors_to_error_messages
from werkzeug.utils import secure_filename

user_routes = Blueprint('users', __name__, url_prefix="/users")


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_user(id):
    user = User.query.get(id)
    if not user:
        not_found_error = NotFoundError("User Not Found")
        return not_found_error.error_json()
    if user.id != current_user.id:
        forbidden_error = ForbiddenError(
            "You do not have permissions to do that!")
        return forbidden_error.error_json()
    form = UpdateUserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        for field in form.data:
            if field != 'csrf_token' and field != 'file':
                if form.data[field] != None:
                    setattr(user, field, form.data[field])
    file = form.file.data
    if file != None:
        filename = secure_filename(file.filename)
        success, file_url = s3.upload_file(file, filename, user.id)
        if not success:
            return {"errors": {"avatar": file_url}}
        setattr(user, 'avatar', file_url)
        db.session.commit()
        return user.to_dict_extra()
    return {"errors", validation_errors_to_error_messages(form.errors)}, 400
