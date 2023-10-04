#!/bin/bash

# Step 7: Copy the WebAssembly package and web files to 'docs'
mkdir -p docs
cp -r pkg/* docs/
cp -r web/* docs/

# Step 8: Add, commit, and push changes to GitHub
git add docs/*
git commit -m "Deploy to GitHub Pages"
git push origin main

echo "Deployed to GitHub Pages."
