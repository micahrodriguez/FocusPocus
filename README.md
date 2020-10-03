# FocusPocus

A web app that leverages the Muse headset to detect concentration and
distraction.

## Team

This web app was created by the "Neurotech at Cal" Club at the
University of California, Berkeley.


## Getting Started

First, make sure that the following development tools are installed:

- `yarn`
- `npm` (this is needed to build one of the modules for the front-end)
- Python 3
- Some C compiler toolchain (`gcc`/`clang`, `make`)

Obviously, it's not optimal to have to both use `yarn` and `npm` at
the same time, but it works. Maybe this will be fixed in a future
release.

Next, clone the project and run `setup.sh` for a first-time setup of
the project. This creates a Python `virtualenv` in the `server`
directory, installs necessary programs into it, and uses `npm` to install
front-end dependencies. Some important things to note about `setup.sh`
are:

- It doesn't seem to like macOS Catalina and is likely to fail.
  - The error message usually being `gyp: No Xcode or CLT version detected!`

At this stage, if you want to work on the React page by itself, move
into the `client` directory and run `yarn start` or `npm start`. If
you want to run everything (i.e. the front and back ends) together,
run `start.sh` from the root folder (this folder). `start.sh` will
create an optimized build of the website and start the Flask backend
as well. 
