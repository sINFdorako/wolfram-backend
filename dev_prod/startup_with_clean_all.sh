#!/bin/bash

# Stop all containers defined in docker-compose.yml
docker-compose -f ../docker-compose.prod.yml down

# Removing all images related to services defined in docker-compose.yml
docker-compose -f ../docker-compose.prod.yml rm -f

# Building fresh images
docker-compose -f ../docker-compose.prod.yml build

# Starting the services
docker-compose -f ../docker-compose.prod.yml up

echo "All services have been cleaned, rebuilt, and restarted."
