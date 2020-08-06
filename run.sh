#!/bin/bash

cd /usr/src/app || exit

npm run build
npm run start
