#!/bin/zsh

echo ":::: setup.sh ::::"
echo "Welcome to FocusPocus!"
echo "Running first-time setup..."
echo "(Hopefully this works (>_<))"
echo ""

# Check dependencies
echo ":: Checking dependencies..."
if command -v npm >/dev/null 2>&1 ; then
    echo "npm ($(npm -v)) found"
else
    echo "ERROR: npm not found"
    exit 1
fi
# if command -v yarn >/dev/null 2>&1 ; then
#     echo "yarn ($(yarn -v)) found"
# else
#     echo "ERROR: yarn not found"
#     exit 1
# fi
if command -v python3 >/dev/null 2>&1 ; then
    echo "python3 ($(python3 --version)) found"
else
    echo "ERROR: python3 not found"
    exit 1
fi
echo "Dependency check finished"
echo "(Note that this check is not exhaustive)"
echo ""

# Download client dependencies
echo ":: Installing client npm modules..."
cd ./client || (echo "ERROR: client directory does not exist" && exit 1)
if npm install; then
    echo "Successfully completed npm install"
    echo ""
    cd ..
else
    echo "ERROR: npm install failed"
    echo "(Maybe try removing package-lock.json)"
    exit 1
fi

# Create virtualenv
echo ":: Creating virtualenv..."
cd ./server || (echo "ERROR: server directory does not exist" && exit 1)
python3 -m venv ./venv
echo "Successfully created virtualenv"
echo ""

# Install flask and other things
echo ":: Installing server pip modules..."
. ./venv/bin/activate
if test -f "./requirements.txt"; then
    echo "requirements.txt found"
    pip3 install -r ./requirements.txt
    echo "Successfully installed pip modules"
    echo ""
else
    echo "ERROR: requirements.txt not found"
    exit 1
fi

# Initialize database
echo ":: Initializing database..."
cd ..
export FLASK_APP=./server/flaskr
export FLASK_ENV=development
flask init-db
echo "Database initialized"
echo ""

# Final notes
echo "INSTALLATION COMPLETED"
echo "Important note: if you want to run the flask server"
echo "by itself, run the following commands from the root folder:"
echo "    . server/venv/bin/activate"
echo "    export FLASK_APP=./server/flaskr"
echo "    export FLASK_ENV=development"
echo "    flask run"

