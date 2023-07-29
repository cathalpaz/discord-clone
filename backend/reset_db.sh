#!/bin/bash
set -e

if [ -d "./instance" ]; then
    rm -rf ./instance/*
fi

if [ -d "./migrations" ]; then
    rm -rf ./migrations/*
fi

flask db init
flask db migrate
flask db upgrade
flask seed all
