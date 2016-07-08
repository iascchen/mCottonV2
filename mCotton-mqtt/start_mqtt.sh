#!/bin/bash

MONGO_URL=mongodb://localhost:9801/meteor meteor --port 9808 --production --settings setting/mqtt.json
