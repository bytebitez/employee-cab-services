#!/bin/sh
flask db init || true
flask db migrate -m "Initial migration for user management service"
flask db upgrade
