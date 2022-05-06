FROM node:latest as assets-builder

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /frontend

COPY ./frontend/package*.json /frontend/

RUN npm install

COPY ./frontend/ /frontend/

RUN npm run build


# Dockerfile for Django Applications
# Section 1- Base Image
FROM python:3.8-slim

ENV REACT_BUILD_DIR=/inguard/assets/build

ENV DRBUG=0

# Section 2- Python Interpreter Flags
ENV PYTHONUNBUFFERED 1
ENV PYTHONDONTWRITEBYTECODE 1
# Section 3- Compiler and OS libraries
RUN apt-get update \
  && apt-get install -y --no-install-recommends build-essential libpq-dev libmagic-dev \
  && rm -rf /var/lib/apt/lists/*
# Section 4- Project libraries and User Creation
COPY ./backend/requirements.txt /tmp/requirements.txt
RUN pip install --no-cache-dir -r /tmp/requirements.txt \
    && rm -rf /tmp/requirements.txt \
    && useradd -U inguard \
    && install -d -m 755 -o inguard -g inguard /inguard /inguard/static /inguard/assets
# Section 5- Code and User Setup

WORKDIR /inguard

COPY --from=assets-builder /frontend/build/ $REACT_BUILD_DIR

USER inguard:inguard
COPY --chown=inguard:inguard  ./backend .

RUN chmod +x docker.entrypoint.sh
# Section 6- Docker Run Checks and Configurations
ENTRYPOINT [ "/inguard/docker.entrypoint.sh" ]

#CMD [ "docker/start.sh", "server" ]