#!/bin/sh
# dump.sh
# Dumps hazard data
pg_dump -Fc \
        -x -O \
        -t droughts \
        -t earthquakes \
        -t fires \
        -t floods \
        -t hurricanes \
        -t precipitation \
        -t temperature \
        -t tsunami \
        -t volcanic_eruptions \
        -t wind \
        ca-alert_development
