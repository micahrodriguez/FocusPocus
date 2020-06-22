#!/bin/zsh

. server/venv/bin/activate
export FLASK_APP=./server/flaskr
export FLASK_ENV=development
flask run
