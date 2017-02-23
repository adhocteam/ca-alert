#!/bin/sh
# scrape.sh
# Downloads hazard data from various government sources
set -euxo pipefail

AGStoSHP=$HOME/Downloads/AGStoShapefile/AGStoSHP.js

cat > services.txt <<EOF
https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_weather_hazards/MapServer/1|Temperature
https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_weather_hazards/MapServer/4|Precipitation
https://igems.doi.gov/arcgis/rest/services/igems_info/MapServer/0|Wind
https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_weather_hazards/MapServer/7|Droughts
https://wildfire.cr.usgs.gov/ArcGIS/rest/services/geomac_dyn/MapServer/0|Fires
https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/0|Floods
https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/3|Earthquakes
https://maps.ngdc.noaa.gov/arcgis/rest/services/web_mercator/hazards/MapServer/0|Tsunami
https://maps.ngdc.noaa.gov/arcgis/rest/services/web_mercator/hazards/MapServer/6|Volcanic_Eruptions
https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer/5|Hurricanes
EOF

trap "rm -f services.txt" EXIT

mkdir -p output

node $AGStoSHP
