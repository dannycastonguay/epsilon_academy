#!/bin/bash
# Exit on any error
set -e

# Build the project
wasm-pack build --release

# Commit changes on the main branch
git add .
git commit -m "Update main branch"
git push origin main

# Copy pkg directory to a temp location
cp -r pkg /tmp/

# Switch to gh-pages branch
git checkout gh-pages

# Copy files from temp location to current directory
cp -r /tmp/pkg/* .

# Add, commit and push files
git add .
git commit -m "Update gh-pages branch"
git push origin gh-pages

# Go back to the main branch
git checkout main
