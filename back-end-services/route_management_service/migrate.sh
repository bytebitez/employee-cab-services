#!/bin/sh
flask db init || true
flask db migrate -m "Initial migration for route management service"
flask db upgrade
