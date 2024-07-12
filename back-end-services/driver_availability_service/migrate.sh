#!/bin/sh
flask db init || true
flask db migrate -m "Initial migration for driver availability service"
flask db upgrade
