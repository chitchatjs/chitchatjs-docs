#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# Copy the JS.ORG CNAME
cp CNAME src/.vuepress/dist

# Replace the home page title - SEO
sed -i 's/<title>chitchat.js<\/title>/<title>chitchat.js | Voice Apps Framework for Alexa.<\/title>/g' src/.vuepress/dist/index.html

# navigate into the build output directory
cd src/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
git push -f https://github.com/chitchatjs/chitchatjs.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -

