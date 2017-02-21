#!/bin/sh
# import.sh
# Imports hazard data in GeoJSON into the CA alerts PostGIS db
set -euo pipefail
DBNAME=${DBNAME:-ca-alert_development}
GEOJSON_DIR=${GEOJSON_DIR:-output}
while read layer; do
    echo $layer
    ogr2ogr -f PostgreSQL PG:dbname=$DBNAME -nln $(echo $layer | tr A-Z a-z) ${GEOJSON_DIR}/${layer}.geojson
done <<EOF
Droughts
Earthquakes
Fires
Floods
Hurricanes
Precipitation
Temperature
Tsunami
Volcanic_Eruptions
Wind
EOF
