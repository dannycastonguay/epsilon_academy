#!/bin/bash

# Compile the project to WebAssembly
wasm-pack build --target web

# Run a local server
python3 -m http.server
