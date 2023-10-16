#!/bin/sh
if [ "$(git pull)" != "Already up to date." ];
  then
    git fetch --all
    git reset --hard origin/main
    npm run build
  fi
npm run start