#!/bin/bash

# Exit on any error
set -e

# Build the Rust/Wasm project
wasm-pack build --target web

# Checkout to the gh-pages branch
git checkout gh-pages

# Copy files from pkg to current directory
cp pkg/* .

# Add, commit, and push the changes to gh-pages branch
git add .
git commit -m "Deploy updates"
git push origin gh-pages

# Switch back to your previous branch
git checkout -

# Output a message indicating successful deployment
echo "Successfully deployed to gh-pages branch."
