Dockerized -

Client Built with Vue

API and ran behind Containerized NGINX Reverse Proxy

Aggregator Containers Connects to Twitter, Youtube, and Twitch's APIs and Aggregates Data
into efficiently deserializable data structs to be accessed over the orchestrated docker-network as defined in docker-compose.yml by the tracker container into the Redis Cache, to be accessed on a custom API defined within the Nuxt3 Nitro Server.

# Customize
Base URL is defined in tracker/nuxt.config.js

Logos are defined in public/logo-light.png & public/logo-dark.png


# Notes
Dependent on the open source lenmoslife operational api, I have a microservice written up in case it ever dies.

  #web:
   # build: ./tracker
    # Bind Ports
    # ports:
    #  - "8000:3000" 
    #volumes:
    # - ./tracker:/usr/src/app # For Testing - Oof- The Volume breaks Container if not running Linux.
