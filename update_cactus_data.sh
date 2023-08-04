#!/bin/bash

CACTUS_API=http://cactuscosting.com/cactus-calcs/pull_cactus_json_app_json.php

curl -L $CACTUS_API -o ./static/cactus-data.json