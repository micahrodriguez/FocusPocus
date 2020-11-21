import os

from flask import Flask, jsonify, safe_join, send_from_directory, request, session
from flask_cors import CORS
from flaskr.db import get_db

from . import db
from . import auth
from . import utils

from werkzeug.utils import secure_filename

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
        DATA_FOLDER='./user_data/'
    )

    # Set Default User 
    # TODO Implement log and register pages
    user_id = 1

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

    # Session List Route
    @app.route('/api/session_list')
    def session_list():
        """Get the set of sessions for current user"""
        db = get_db()
        sessions = db.execute('SELECT * FROM records WHERE owner_id = ?',
                          (user_id, )).fetchall()
        if sessions is None:
            return jsonify({'has_error': True, 'error': 'no entries'})
        return jsonify([dict(zip(r.keys(), r)) for r in sessions])

    # File Upload Route
    @app.route('/api/file', methods=['POST'])
    def file_upload():
        """Get File From Post Request Header """
        print(request.files)
        # Check File Part
        if 'file' not in request.files:
            print("NO FILE")
            return jsonify({'has_error': True, 'error': 'no file part'})
        # Check File Name
        file = request.files['file']
        date = request.form['date']
        time = request.form['time']
        act_type = request.form['act_type']
        print(file)
        if file.filename == '':
            print("NO FILE NAME")
            return jsonify({'has_error': True, 'error': 'no file name'})
        # Save File
        if file and utils.check_file(file.filename):
            file_name = date[4:].replace('-', '') + '_' + time.replace(':', '') + '.csv'
            # TODO: Determine User Data Schema Replace null_usr
            file_path = os.path.join(app.config['DATA_FOLDER'], str(user_id))
            print(os.path.join(file_path, file_name))
            if not os.path.exists(file_path):
                print("made")
                os.makedirs(file_path)
            file.save(os.path.join(file_path, file_name))
            # Save DB entry
            db = get_db()
            db.execute('INSERT INTO records (owner_id, activity_type, f_name) VALUES (?, ?, ?)',
                       (user_id, act_type, file_name))
            db.commit()
            return jsonify({'has_error': False, 'error': ''})
        return jsonify({'has_error': True, 'error': 'wrong file type'})

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
