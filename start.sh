#!/bin/sh
if [ "$(git pull)" != "Already up to date." ];
  then
    npm run build
  fi
npm run start