#!/bin/bash

# Compile the project to WebAssembly
wasm-pack build --target web

# Open the default web browser to navigate to the local server
open 'http://localhost:8000'

# Run a local server
python3 -m http.server

