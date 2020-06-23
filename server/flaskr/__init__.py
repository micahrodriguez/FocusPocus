import os

from flask import Flask, jsonify, safe_join, send_from_directory
from flask_cors import CORS

from . import db
from . import auth


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

    # Static routes
    @app.route('/static/<path:filename>', methods=['GET'])
    def static_items(filename):
        """Return static resources."""
        return send_from_directory(app.config['STATIC_FOLDER'], filename)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def index(path):
        """Return index.html for all non-api routes"""
        #pylint: disable=unused-argument
        return send_from_directory(app.static_folder, 'index.html')
    


    # = = = = = = = = = = = = = = = = = = = =
    # REGISTRATION
    # = = = = = = = = = = = = = = = = = = = =
    db.init_app(app)
    app.register_blueprint(auth.bp)



    return app
