#!/bin/sh
if [ "$(git pull 2>&1)" != "Already up to date." ];
  then
    echo "[Update]: Updates available"
    echo "[Update]: Fetching data..."
    git fetch --all > /dev/null
    echo "[Update]: Writting changes..."
    git reset --hard origin/main > /dev/null
    echo "[Update]: Building changes..."
    npm run build > /dev/null
    echo "[Update]: Done"
  fi
echo "[Update]: Server up to date"
npm run start