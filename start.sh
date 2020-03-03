#!/bin/sh
docker build -t rushing/server -f ./server/Dockerfile ./server
docker build -t rushing/client -f ./client/Dockerfile ./client
docker-compose up
