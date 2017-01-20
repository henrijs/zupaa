#!/bin/sh
CURRENTPATH=`pwd`
cd `dirname $0`

echo "Testing theme environment..."
if [ -z "${TEMP}" ] || [ ! -w ${TEMP} ]; then TEMP="/tmp"; fi
if [ -z "${HOME}" ] || [ ! -w ${HOME} ]; then HOME="${TEMP}"; fi

echo "Installing all theme dependencies..."
yarn install

echo "Compiling assets..."
gulp production

echo "Removing theme development dependencies..."
yarn install --production

echo "Theme build finished."
