#!/bin/sh
# comentario random para poder pushear :D
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
echo "[Server]: Starting server..."
npm run start