from functools import wraps
from ..models import Server
from ..errors import NotFoundError, ForbiddenError
from flask_login import current_user


def server_owner_required(func):
    @wraps(func)
    def decorated_func(id):
        server = Server.query.get(id)
        if not server:
            not_found_error = NotFoundError("Server Not Found")
            return not_found_error.error_json()
        if current_user.id != server.owner_id:
            forbidden_error = ForbiddenError(
                "You do not have permission to edit/delete this server")
            return forbidden_error.error_json()
        return func(server)
    return decorated_func
