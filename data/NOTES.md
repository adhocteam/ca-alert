Notes about data sources to use for hazards
===========================================

TODO:

* Spatially enable ca-alert_development: CREATE EXTENSION postgis;

## Major types of hazard data to include in prototype

* Extreme weather - temperature: `cpc_weather_hazard` layer 1
* Extreme weather - precipitation: `cpc_weather_hazard` layer 4
* Extreme weather - winds: `igems_info` layer 0
* Extreme weather - droughts: `cpc_weather_hazard` layer 7
* Extreme weather - fires: `geomac_dyn` layer 0 (layer 1?)
* Extreme weather - floods: `sig_riv_fld_outlk` layer 0 (ahps_riv_gauges?, `igems_haz` layer 0?)
* Earthquakes: USGS GeoJSON feed (`tsunami` layer 5?)
* Tsunami: `tsunami` layer 0
* Volcanoes: `tsunami` layer 6
* Hurricanes: `igems_haz` layer 5 (layer 6?)

ArcGIS servers -> something useful

https://github.com/tannerjt/AGStoShapefile

Converts ESRI JSON to GeoJSON:

https://github.com/calvinmetcalf/esri2geo

Project: write a Go program that downloads data from an ArcGIS REST API service

2 libraries/programs:

* Convert ESRI JSON to GeoJSON
* Query ArcGIS REST API service for all data (start with object IDs, then get
  all in 100-piece batches)

## Active Fire Boundaries (USGS GeoMAC)

### [Active Fires][geomac_dyn]

[geomac_dyn]: https://wildfire.cr.usgs.gov/ArcGIS/rest/services/geomac_dyn/MapServer

Appears to be main current fires service.

#### Layers

* `Current Fires` (0)
* `Current Fire Perimeters` (1)
* `MODIS Fire Detection` (2)
* `HMS Fire Detection` (3)
* `All Current Year Fires` (4)
* `Previous Perimeters` (5)
* `Previous MODIS` (6)
* `2016 Fires` (7)
* `2015 Fires` (8)
* `2014 Fires` (9)
* `2013 Fires` (10)
* `2012 Fires` (11)
* `2011 Fires` (12)
* `2010 Fires` (13)
* `2009 Fires` (14)
* `2008 Fires` (15)
* `2007 Fires` (16)
* `2006 Fires` (17)
* `2005 Fires` (18)
* `2004 Fires` (19)
* `2003 Fires` (20)
* `2002 Fires` (21)
* `Historic Fire Perimeters` (22)
* `RAWS Weather Stations` (23)
* `Land Ownership - PADUS` (24)
* `Wildland-Urban Interface` (25)
* `Snow Courses` (26)
* `SNOTEL Sites` (27)

### https://wildfire.cr.usgs.gov/ArcGIS/rest/services/geomac_perims/MapServer

Not sure what service this provides.

#### Layers

* `geomac_nifc_lrg_fires_dd83` (0)
* `city_2mil_dd83` (1)
* `rds_2mil_dd83` (2)
* `modis_dd83` (3)
* `PERIMETERS_DD83` (4)
* `urban_dd83` (5)
* `nabnd_15mil_dd83` (6)
* `US_SR_NED_DD83` (7)

### https://wildfire.cr.usgs.gov/ArcGIS/rest/services/geomac_fires/MapServer

Not sure what service this provides.

#### Layers

* `GeoMAC Current` (0)
* `Large Fire Points` (1)
* `Fire Perimeters` (2)
* `MODIS Thermal Satellite` (3)
* `Inactive Fire Perimeters` (4)

## River Gauge - Current and Forecast (NOAA)

### [River Gauge current stages and forecasted river stages out to 336 hours][ahps_riv_gauges]

[ahps_riv_gauges]: https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Observations/ahps_riv_gauges/MapServer

Shapefiles for observed and forecast (updated every 15 minutes) can be
downloaded, may be easier to ingest than ESRI JSON:

* [http://water.weather.gov/ahps/download.php](http://water.weather.gov/ahps/download.php)

#### Layers

* `Observed River Stages` (0)
* `48 Hour Forecast_River_Stages` (1)
* `72 Hour Forecast_River_Stages` (2)
* `96 Hour Forecast_River_Stages` (3)
* `120 Hour Forecast_River_Stages` (4)
* `144 Hour Forecast_River_Stages` (5)
* `192 Hour Forecast_River_Stages` (6)
* `216 Hour Forecast_River_Stages` (7)
* `240 Hour Forecast_River_Stages` (8)
* `264 Hour Forecast_River_Stages` (9)
* `288 Hour Forecast_River_Stages` (10)
* `312 Hour Forecast_River_Stages` (11)
* `336 Hour Forecast_River_Stages` (12)
* `Full Forecast Period Stages` (13)

### [Significant River Flooding Outlooks][sig_riv_fld_outlk]

[sig_riv_fld_outlk]: https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/sig_riv_fld_outlk/MapServer

Data download as Shapefile:

* [ftp://ftp.wpc.ncep.noaa.gov/shapefiles/fop](ftp://ftp.wpc.ncep.noaa.gov/shapefiles/fop)

#### Layers

* `Flood Outlook` (0)

### [Quantitative Precipitation Forecasts (QPFs)][wpc_qpf]

[wpc_qpf]: https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/wpc_qpf/MapServer

Data download as Shapefile:

* [ftp://ftp.wpc.ncep.noaa.gov/shapefiles/qpf](ftp://ftp.wpc.ncep.noaa.gov/shapefiles/qpf)

## Weather Hazards (NOAA)

### [U.S. Hazards Outlook][cpc_weather_hazard]

Layers of temperature, precipitation, flooding, high winds, high waves, and
wildfire/drought hazards for the U.S. through 14 days.

Shapefile downloads:

* [http://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php](http://www.cpc.ncep.noaa.gov/products/predictions/threats/threats.php)

#### Layers

* `Temperature` (0)
* `3-7 Day Temperature Outlook` (1)
* `8-14 Day Temperature Outlook` (2)
* `Precipitation` (3)
* `3-7 Day Precipitation Outlook` (4)
* `8-14 Day Precipitation Outlook` (5)
* `Wildfire_Drought` (6)
* `3-7 Day WildFire/Drought` (7)
* `8-14 Day Wildfire/Drought` (8)

[cpc_weather_hazard]: https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Climate_Outlooks/cpc_weather_hazards/MapServer

### [Short and long fuse watches, warnings and advisories][watch_warn_adv]

[watch_warn_adv]: https://idpgis.ncep.noaa.gov/arcgis/rest/services/NWS_Forecasts_Guidance_Warnings/watch_warn_adv/MapServer

#### Layers

* `CurrentWarnings` (0)
* `WatchesWarnings` (1)

## Earthquakes (USGS)

### [Earthquakes from last seven days][EarthquakesFromLastSevenDays]

[EarthquakesFromLastSevenDays]: http://sampleserver3.arcgisonline.com/arcgis/rest/services/Earthquakes/EarthquakesFromLastSevenDays/MapServer

A better source is [here](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and has GeoJSON, past hour, past day, etc.

#### Layers

* `Earthquakes from last 7 days` (0)

## Tsunami (NOAA)

### [Tsunamis and other hazards][tsunami]

[tsunami]: https://maps.ngdc.noaa.gov/arcgis/rest/services/web_mercator/hazards/MapServer

#### Layers

* `Tsunami Events [green squares]` (0)
* `Tsunami Events by Cause/Fatalities` (1)
* `Tide Gauge/Deep Ocean Gauge Tsunami Observations` (2)
* `Eyewitness Tsunami Observations/Post-Tsunami Surveys` (3)
* `Tsunami Observations [by measurement type]` (4)
* `Significant Earthquakes` (5)
* `Significant Volcanic Eruptions` (6)
* `Volcano Locations [from Smithsonian]` (7)
* `Current DART Deployments` (8)
* `Retrospective BPR Deployments` (9)
* `NOS/COOPS Tsunami Tide Gauges` (10)
* `Plate Boundaries [from UTIG]` (11)

## Interior Geospatial Emergency Management System (DOI IGEMS)

### [IGEMS Natural Hazards][igems_haz]

Recent natural hazards including earthquakes, hurricanes, floods, and wildfires.

#### Layers

* `Floods` (0)
* `U.S. Volcanoes` (1)
* `Other Volcanoes` (2)
* `Earthquakes` (3)
* `ShakeMaps` (4)
* `Hurricanes` (5)
* `Hurricane Forecasts` (6)
* `Forecastpts` (7)
* `Forecastlns` (8)
* `Forecastpls` (9)
* `Wildfires` (10)
* `Wildfire Perimeters` (11)
* `Warnings` (12)
* `Watches` (13)
* `Advisories` (14)

[igems_haz]: https://igems.doi.gov/arcgis/rest/services/igems_haz/MapServer

### [IGEMS General Data][igems_info]

Current global wind conditions and the locations and current information
associated with global weather stations, tide monitoring stations, and
U.S. stream gages, as well as boundaries for all federally managed lands.

[igems_info]: https://igems.doi.gov/arcgis/rest/services/igems_info/MapServer

#### Layers

* `Wind Conditions` (0)
* `Weather Stations` (1)
* `Stream Flow Stations` (2)
* `Land Ownership` (3)
* `Tide Stations` (4)
