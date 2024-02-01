#!/usr/bin/env bash

uid=$(stat -c '%u' /app/package.json)

if [[ "$uid" != "0" ]]; then
	chown -R "$uid:$uid" /home /app/node_modules /app/dist
	if ! getent passwd "$uid"; then
		adduser -D -u "$uid" app
		su - app
	fi
fi

cd /app || exit 2
npm ci

exec npm run start
