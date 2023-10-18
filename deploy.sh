#!/bin/bash

# Commit and push to main
git checkout main
git add .
git commit -m "Update main branch"
git push origin main

# Make gh-pages an exact copy of main
git checkout gh-pages
git reset --hard main

# Minify JS files in root and update index.html
for file in *.js; do
  min_file="min_$file"
  uglifyjs "$file" -o "$min_file"
  sed -i "s/$file/$min_file/g" index.html
done

# Minify JS files in apps and update index.html
for file in apps/*.js; do
  min_file="apps/min_$(basename "$file")"
  uglifyjs "$file" -o "$min_file"
  sed -i "s/$(basename "$file")/min_$(basename "$file")/g" index.html
done

# Add, commit, and push everything
git add min_*.js apps/min_*.js index.html
git commit -m "Minify JS and update index.html for GitHub Pages"
git push -f origin gh-pages

# Switch back to main
git checkout main

# Open GitHub Pages URL
open 'https://github.com/dannycastonguay/epsilon_academy'
