#!/bin/sh
flask db init || true
flask db migrate -m "Initial migration for booking service"
flask db upgrade
