# Harmony
Restful service that provides song suggestions based on user behavior and preferences

## Installing Dependencies
Install node
https://nodejs.org/en/download/

    node -v // outputs v10.16.0

## Install/Configure Mongo
You can download community version here:
https://www.mongodb.com/download-center/community

Copy extracted mongo binaries to usr/local/mongodb
    
    sudo mv mongodb-osx-x86_64-4.0.5 /usr/local/mongodb

Set exported paths in .bash_profile
    
    export MONGO_PATH=/usr/local/mongodb export PATH=$PATH:$MONGO_PATH/bin
  
You can confirm mongo is installed in proper location here:  
  
    which mongo // outputs /usr/local/mongodb/bin/mongo

Create default directory to hold data for mongo from home at /data/db
  
    mkdir /data/db

Set permissions on data directory
  
    sudo chown [username] /data/db

Start up mongo daemon on port 27017
  
    mongod

Mongo/Shell Prompt
  
    mongo

## Start/Run API Node Server
    
    npm install && npm run api-start


  
