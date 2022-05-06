#!/bin/bash


python manage.py collectstatic --noinput
python manage.py makemigrations
python manage.py migrate

gunicorn \
            --bind 0.0.0.0:8000 \
            --log-level DEBUG \
            --access-logfile "-" \
            --error-logfile "-" \
            backend.wsgi