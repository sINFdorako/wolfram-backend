#!/bin/bash
#
# before starting the script, make sure to set the correct ENVIRONEMNT 
# 'export ENVIRONMENT=production' or export 'ENVIRONMENT=local'
#
# reason for this script is to not suffer from letsencrypt issues locally 
# and also to not have any issues on the server when running ssl
#
# check for envirnoment variable "ENVIRONMENT"
if [ "$ENVIRONMENT" == "production" ]; then
    cp nginx-config/nginx-prod.conf nginx-config/default.conf
else
    cp nginx-config/nginx-local.conf nginx-config/default.conf
fi

# start containers
podman-compose up
