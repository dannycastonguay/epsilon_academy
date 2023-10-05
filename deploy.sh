#!/bin/bash

# Build the project
wasm-pack build --target web --release

# Commit and push to main
git checkout main
git add .
git commit -m "Update main branch"
git push origin main

# Make gh-pages an exact copy of main
git checkout gh-pages
git reset --hard main
git push -f origin gh-pages

# Switch back to main
git checkout main