'''server/app.py - main api app declaration'''
from flask import Flask, jsonify, safe_join, send_from_directory
from flask_cors import CORS

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../../client/build')
app.config['STATIC_FOLDER'] = '../../client/build/static'
CORS(app)

##
# API routes
##

@app.route('/api/items')
def items():
  '''Sample API route for data'''
  print(app.root_path)
  return jsonify([{'title': 'A'}, {'title': 'B'}])

##
# Static route
##
@app.route('/static/<path:filename>', methods=['GET'])
def static_items(filename):
  """Return static resources."""
  print(type(filename))
  return send_from_directory(app.config['STATIC_FOLDER'], filename)

##
# View route
##

@app.route('/')
def index():
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  return send_from_directory(app.static_folder, 'index.html')
