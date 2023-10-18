#!/bin/bash

# Checkout to main branch and pull latest changes
git checkout main
git pull origin main

# Minify main JavaScript file
./node_modules/.bin/esbuild index.js --bundle --minify --outfile=index.min.js

# Loop through and minify each JavaScript file in the apps directory
for file in apps/*.js; do
  ./node_modules/.bin/esbuild "$file" --bundle --minify --outfile="${file%.js}.min.js"
done

# Minify CSS
./node_modules/.bin/esbuild styles.css --loader=css --minify --outfile=styles.min.css

# Add and commit changes
git add -A
git commit -m "Minify JS and CSS for deployment"

# Push changes to main branch
git push origin main

# Checkout to gh-pages branch and pull the latest changes
git checkout gh-pages
git pull origin gh-pages

# Copy minified files to gh-pages branch
cp index.min.js index.min.js
cp styles.min.css styles.min.css

# Copy minified app files to gh-pages/apps directory
cp apps/*.min.js apps/

# Add and commit changes
git add -A
git commit -m "Deploy minified JS and CSS to GitHub Pages"

# Push changes to gh-pages branch
git push origin gh-pages

# Switch back to main branch
git checkout main
