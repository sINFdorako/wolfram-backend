#!/bin/bash

# Stop all containers defined in docker-compose.yml
docker-compose down

# Removing all images related to services defined in docker-compose.yml
docker-compose rm -f

# Building fresh images
docker-compose build

# Starting the services
docker-compose up

echo "All services have been cleaned, rebuilt, and restarted."
