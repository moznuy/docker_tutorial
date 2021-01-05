FROM python:3-slim

RUN apt-get update
RUN apt-get install --no-install-recommends --no-install-suggests -y postgresql-client

WORKDIR /app

COPY requirements.txt /
RUN pip install -r /requirements.txt

COPY . /app
