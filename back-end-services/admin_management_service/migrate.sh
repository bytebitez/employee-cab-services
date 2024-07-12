#!/bin/sh
flask db init || true
flask db migrate -m "Initial migration for admin management service"
flask db upgrade
