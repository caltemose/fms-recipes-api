#!/bin/bash

MONGO_DATABASE="fsapi"
TIMESTAMP=`date +%F-%H%M`
BACKUPS_DIR="./backups/$TIMESTAMP/"
ARCHIVE_PATH="$BACKUPS_DIR/dump"

mongodump --db $MONGO_DATABASE
mkdir -p $BACKUPS_DIR
mv dump $ARCHIVE_PATH

# To restore:
# mongorestore --db $MONGO_DATABASE $ARCHIVE_PATH
