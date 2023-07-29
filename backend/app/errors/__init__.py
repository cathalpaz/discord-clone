
class BasicError():
    def __init__(self, message) -> None:
        self.message = message
        self.status = 200

    def error_json(self):
        return {"error": self.message}, self.status


class NotFoundError(BasicError):
    def __init__(self, message) -> None:
        super().__init__(message)
        self.status = 404


class ForbiddenError(BasicError):
    def __init__(self, message) -> None:
        super().__init__(message)
        self.status = 403
