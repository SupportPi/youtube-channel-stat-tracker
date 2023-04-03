Dockerized -

Client Built with Vue

Aggregators Container Connects to Youtube via API and Aggregates Stats 
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
