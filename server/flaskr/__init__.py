import os

from flask import Flask, jsonify, safe_join, send_from_directory, request, session
from flask_cors import CORS

from . import db
from . import auth
from . import utils

from werkzeug.utils import secure_filename

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
        DATA_FOLDER='../user_data'
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
    
    # File Upload Route
    @app.route('/api/file', methods=['POST'])
    def file_upload():
        """Get File From Post Request Header """
        # Check File Part
        if 'file' not in request.files:
            return jsonify({'has_error': True, 'error': 'no file part'})
        # Check File Name
        file = request.files['file']
        if file.filename == '':
            return jsonify({'has_error': True, 'error': 'no file name'})
        # Save File
        if file and check_file(file.filename):
            # TODO: Determine File Name Schema
            file_name = secure_filename(file.filename)
            # TODO: Determine User Data Schema
            file_path = os.path.join(app.config['DATA_FOLDER'], session.get('user_id'))
            if not os.exists(file_path):
                os.makedirs(file_path)
            file.save(os.path.join(file_path, file_name))
            return jsonify({'has_error': False, 'error': ''})

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
