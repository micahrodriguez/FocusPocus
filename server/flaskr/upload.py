import os
from flask import Blueprint, Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

bp = Blueprint('auth', __name__, url_prefix='/upload')

ALLOWED_EXTENSIONS = {'txt', 'csv'}
"""set: Allowed extensions to files being uploaded."""


def _ALLOWED_FILE(filename: str) -> bool:
    """Determines if a filename is allowed or not."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@bp.route('/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Check if the post request has the file part
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        # If user does not select file, browser also submit an empty part
        # without filename
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and _ALLOWED_FILE(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('uploaded_file',
                                    filename=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''
