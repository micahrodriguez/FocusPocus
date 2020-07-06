import os

from flask import \
    Flask, \
    jsonify, \
    safe_join, \
    send_from_directory, \
    flash, \
    request, \
    redirect, \
    url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename

from . import db
from . import auth

ALLOWED_EXTENSIONS = {'txt', 'csv'}
"""set: Allowed extensions to files being uploaded."""


def _ALLOWED_FILE(filename: str) -> bool:
    """Determines if a filename is allowed or not."""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def create_app(test_config=None):
    # = = = = = = = = = = = = = = = = = = = =
    # SETUP
    # = = = = = = = = = = = = = = = = = = = =

    # Create and configure the app
    app = Flask(__name__,
                instance_relative_config=True,
                static_folder='../../client/build')
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
        DATABASE=os.path.join(app.instance_path, 'flaskr.sqlite'),
        STATIC_FOLDER='../../client/build/static',
        UPLOAD_FOLDER='../instance/uploads',
        MAX_CONTENT_LENGTH=(16 * 1024 * 1024),  # i.e. 16 MiB
    )

    if test_config is None:
        # Load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load the test config if passed in
        app.config.from_mapping(test_config)

    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # = = = = = = = = = = = = = = = = = = = =
    # ROUTES
    # = = = = = = = = = = = = = = = = = = = =

    # API routes
    @app.route('/api/items')
    def items():
        """Sample API route for data"""
        print(app.root_path)
        return jsonify([{'title': 'A'}, {'title': 'B'}])

    # Upload
    @app.route('/upload', methods=['GET', 'POST'])
    def upload_file():
        if request.method == 'POST':
            # Check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            # If user does not select file, browser also submit an empty
            # part without filename
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
            if file and _ALLOWED_FILE(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                return redirect(url_for('uploaded_file', filename=filename))
        return '''
        <!doctype html>
        <title>Upload new File</title>
        <h1>Upload new File</h1>
        <form method=post enctype=multipart/form-data>
          <input type=file name=file>
          <input type=submit value=Upload>
        </form>
        '''

    # Static routes
    @app.route('/static/<path:filename>', methods=['GET'])
    def static_items(filename):
        """Return static resources."""
        return send_from_directory(app.config['STATIC_FOLDER'], filename)

    # Index path
    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        """Return index.html for all non-API routes"""
        # pylint: disable=unused-argument
        return send_from_directory(app.static_folder, 'index.html')

    # = = = = = = = = = = = = = = = = = = = =
    # REGISTRATION
    # = = = = = = = = = = = = = = = = = = = =
    db.init_app(app)
    app.register_blueprint(auth.bp)

    return app
