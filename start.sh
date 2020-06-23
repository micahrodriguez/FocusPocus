#!/bin/zsh

# Rebuild the website
cd client || (echo "FATAL ERROR: Failed to cd to client" && exit)
yarn run build
cd ..

# Start the server in a virtual environment
. server/venv/bin/activate
export FLASK_APP=./server/flaskr
export FLASK_ENV=development
flask run
