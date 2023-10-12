#!/bin/bash

# Run a local server in the background
python3 -m http.server &

# Wait to make sure the server is up
sleep 1

# Open the default web browser to navigate to the local server
open 'http://localhost:8000'
