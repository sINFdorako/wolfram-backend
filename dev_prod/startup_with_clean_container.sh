#!/bin/bash

# Usage: ./rebuild.sh [container_name]
# Example: ./rebuild.sh nodejs

CONTAINER_NAME=$1

if [ -z "$CONTAINER_NAME" ]; then
    echo "Error: Please specify a container to rebuild."
    echo "Usage: ./rebuild.sh [container_name]"
    echo "Example: ./rebuild.sh nodejs"
    exit 1
fi

# Stop and remove the container
docker-compose -f ../docker-compose.prod.yml stop $CONTAINER_NAME
docker-compose -f ../docker-compose.prod.yml rm -f $CONTAINER_NAME

# Rebuild the container
docker-compose -f ../docker-compose.prod.yml build $CONTAINER_NAME

# Start the container again
docker-compose -f ../docker-compose.prod.yml up -d $CONTAINER_NAME

echo "Container $CONTAINER_NAME has been rebuilt and restarted."
