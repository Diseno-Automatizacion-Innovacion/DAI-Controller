#!/bin/sh
if [ "$(git pull 2>&1)" != "Already up to date." ];
  then
    echo "[Update]: fetching data"
    git fetch --all > /dev/null
    echo "[Update]: Writting changes"
    git reset --hard origin/main > /dev/null
    echo "[Update]: Building changes"
    npm run build > /dev/null
    echo "[Update]: done"
  fi
npm run start