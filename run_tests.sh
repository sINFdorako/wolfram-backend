#!/bin/bash

# Stop all containers defined in docker-compose.yml
docker-compose -f docker-compose.local.yml down

# Removing all images related to services defined in docker-compose.yml
docker-compose -f docker-compose.local.yml rm -f

# Building fresh images
docker-compose -f docker-compose.local.yml build nodejs postgres

# Starting the services
docker-compose -f docker-compose.local.yml up -d nodejs postgres

# Allow a moment for the services to initialize
sleep 5

# Install dependencies and run tests inside the nodejs container
# docker exec -it backend-wolfram-nodejs-1 npm install
docker exec -it backend-wolfram-nodejs-1 npm test

# Cleanup: stop and remove the services
docker-compose -f docker-compose.local.yml down

echo "Tests completed and services cleaned up."
