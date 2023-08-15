#!/bin/bash

# Check if the ENVIRONMENT variable exists
if [ -z "$ENVIRONMENT" ]; then
    echo "Error: The ENVIRONMENT variable is not set."
    echo "Please set it to either 'production' or 'local'."
    echo "For example: 'export ENVIRONMENT=production' or 'export ENVIRONMENT=local'"
    exit 1
fi

# Set nginx configuration based on the ENVIRONMENT variable
if [ "$ENVIRONMENT" == "production" ]; then
    cp nginx-config/nginx-prod.conf nginx-config/default.conf
elif [ "$ENVIRONMENT" == "local" ]; then
    cp nginx-config/nginx-local.conf nginx-config/default.conf
else
    echo "Error: Invalid ENVIRONMENT value. Please set it to either 'production' or 'local'."
    exit 1
fi

# Build node image only if it doesn't exist already
if [ -z "$(docker images -q custom-node-image)" ]; then
    docker build -t custom-node-image -f Dockerfile.node .
fi

# Start containers
docker-compose up
