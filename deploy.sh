#!/bin/bash

# Exit on any error
set -e

# Build the Wasm package
wasm-pack build --target web

# Commit and push the main branch
git add -A
git commit -m "Update main branch"
git push origin main

# Switch to gh-pages branch and copy files
git checkout gh-pages
cp -r pkg/* .

# Commit and push the gh-pages branch
git add -A
git commit -m "Update GitHub Pages"
git push origin gh-pages

# Switch back to the main branch
git checkout main

# Output a message indicating successful deployment
echo "Successfully deployed to gh-pages branch."
