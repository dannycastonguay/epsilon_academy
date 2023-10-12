#!/bin/bash


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

# Open the default web browser to navigate to github
open 'https://github.com/dannycastonguay/epsilon_academy'
