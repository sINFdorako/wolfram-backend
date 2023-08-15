#!/bin/bash

# Update package lists and upgrade existing packages
sudo apt update && sudo apt upgrade -y

# Install Git
sudo apt install -y git

# Install Docker
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update
sudo apt install -y docker-ce

# Add the current user to the docker group (to run docker without sudo)
sudo usermod -aG docker ${USER}

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Print versions to confirm installations
git --version
docker --version
docker-compose --version

echo "Installation complete. It's recommended to log out and log back in or restart your session for group changes to take effect."

