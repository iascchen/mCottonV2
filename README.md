# mCotton V2

This software will include these parts:

*[x] Web & Mobile
*[x] MQTT Server
*[x] Rule Engine

*[ ] Azure Support
*[ ] Other Services

## How to init system:

    cd mCotton-web
    meteor npm install
    meteor update

    cd mCotton-mqtt
    meteor npm install
    meteor update

    cd mCotton-rule
    meteor npm install
    meteor update

## How to run:

    cd mCotton-web
    ./start.sh

    cd ../meteor-mqtt
    ./start_mqtt.sh

    cd ../meteor-rule
    ./start_rule.sh
