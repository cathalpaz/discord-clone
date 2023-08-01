import os
import boto3
from werkzeug.utils import secure_filename

# TODO raise an error if file does not validate


class S3Helper:
    def __init__(self):
        self.s3 = boto3.client('s3',
                               region_name='us-west-1',
                               aws_access_key_id=os.environ.get(
                                   "S3_ACCESS_KEY"),
                               aws_secret_access_key=os.environ.get("S3_SECRET_KEY"))
        self.bucket = os.environ.get("S3_BUCKET")

    def validate_file(self, file):
        filename = secure_filename(file.filename)

        # Check the file extension only support images jpg, jpeg, png
        if not (filename.endswith('.jpg') or filename.endswith('.jpeg') or filename.endswith('.png')):
            return False, "Unsupported file type. Only jpg, jpeg, and png are supported."

        # Check the file size, 2MB max
        if file.content_length > 2 * 1024 * 1024:
            return False, "File size exceed 2MB."

        return True, "File is valid."

    def upload_file(self, file, file_name):
        valid, message = self.validate_file(file)
        if valid:
            self.s3.upload_fileobj(file, self.bucket, file_name)
            file_url = f"https://{self.bucket}.s3.amazonaws.com/{file_name}"
            return True, file_url
        else:
            return False, message

    def list_files(self, bucket):
        files = self.s3.list_objects(Bucket=bucket)
        return files

    def delete_file(self, file_name):
        try:
            self.s3.delete_object(Bucket=self.bucket, Key=file_name)
            return True, "File deleted successfully."
        except Exception as e:
            return False, str(e)


s3 = S3Helper()
