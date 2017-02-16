# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170215215235) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "postgis"

  create_table "users", force: :cascade do |t|
    t.string   "provider",               default: "email", null: false
    t.string   "uid",                    default: "",      null: false
    t.string   "encrypted_password",     default: "",      null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,       null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string   "unconfirmed_email"
    t.string   "name"
    t.string   "nickname"
    t.string   "image"
    t.string   "email"
    t.json     "tokens"
    t.datetime "created_at",                               null: false
    t.datetime "updated_at",                               null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true, using: :btree
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true, using: :btree
  end

  create_table "droughts", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry",     limit: {:srid=>4326, :type=>"geometry"}
    t.integer  "objectid"
    t.string   "label"
    t.string   "start_date"
    t.string   "end_date"
    t.string   "idp_source"
    t.string   "idp_subset"
    t.float    "st_area(shape)"
    t.float    "st_length(shape)"
    t.index ["wkb_geometry"], name: "droughts_wkb_geometry_geom_idx", using: :gist
  end

  create_table "earthquakes", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry", limit: {:srid=>4326, :type=>"point"}
    t.integer  "objectid"
    t.float    "magnitude"
    t.float    "depth"
    t.string   "location"
    t.string   "id"
    t.string   "pubdate"
    t.string   "link"
    t.integer  "symclass"
    t.index ["wkb_geometry"], name: "earthquakes_wkb_geometry_geom_idx", using: :gist
  end

  create_table "fires", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry",          limit: {:srid=>4326, :type=>"point"}
    t.integer  "objectid"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "acres"
    t.string   "gacc"
    t.string   "hotlink"
    t.string   "state"
    t.string   "irwinid"
    t.string   "status"
    t.string   "iscomplex"
    t.string   "firecause"
    t.string   "reportdatetime"
    t.integer  "percentcontained"
    t.string   "uniquefireidentifier"
    t.string   "firediscoverydatetime"
    t.string   "pooresponsibleunit"
    t.string   "incidentname"
    t.string   "irwinmodifiedon"
    t.string   "mapsymbol"
    t.string   "datecurrent"
    t.index ["wkb_geometry"], name: "fires_wkb_geometry_geom_idx", using: :gist
  end

  create_table "floods", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry", limit: {:srid=>4326, :type=>"point"}
    t.integer  "objectid"
    t.string   "status"
    t.string   "waterbody"
    t.float    "stage"
    t.string   "obstime"
    t.string   "units"
    t.string   "id"
    t.string   "link"
    t.index ["wkb_geometry"], name: "floods_wkb_geometry_geom_idx", using: :gist
  end

  create_table "hurricanes", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry", limit: {:srid=>4326, :type=>"point"}
    t.integer  "objectid"
    t.index ["wkb_geometry"], name: "hurricanes_wkb_geometry_geom_idx", using: :gist
  end

  create_table "precipitation", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry",     limit: {:srid=>4326, :type=>"geometry"}
    t.integer  "objectid"
    t.string   "label"
    t.string   "start_date"
    t.string   "end_date"
    t.string   "idp_source"
    t.string   "idp_subset"
    t.float    "st_area(shape)"
    t.float    "st_length(shape)"
    t.index ["wkb_geometry"], name: "precipitation_wkb_geometry_geom_idx", using: :gist
  end

  create_table "temperature", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry",     limit: {:srid=>4326, :type=>"geometry"}
    t.integer  "objectid"
    t.string   "label"
    t.string   "start_date"
    t.string   "end_date"
    t.string   "idp_source"
    t.string   "idp_subset"
    t.float    "st_area(shape)"
    t.float    "st_length(shape)"
    t.index ["wkb_geometry"], name: "temperature_wkb_geometry_geom_idx", using: :gist
  end

  create_table "tsunami", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry",                  limit: {:srid=>4326, :type=>"point"}
    t.integer  "id"
    t.integer  "year"
    t.integer  "month"
    t.integer  "day"
    t.integer  "hour"
    t.integer  "minute"
    t.string   "date_string"
    t.float    "latitude"
    t.float    "longitude"
    t.string   "location_name"
    t.string   "country"
    t.integer  "region_code"
    t.string   "region"
    t.integer  "cause_code"
    t.string   "cause"
    t.integer  "event_validity_code"
    t.string   "event_validity"
    t.float    "eq_mag_ms"
    t.float    "eq_magnitude"
    t.integer  "eq_magnitude_rank"
    t.float    "max_event_runup"
    t.float    "ts_intensity"
    t.integer  "damage_amount_order"
    t.string   "damage_description"
    t.string   "comments"
    t.integer  "num_runup"
    t.integer  "damage_amount_order_total"
    t.string   "damage_total_description"
    t.integer  "objectid"
    t.string   "url"
    t.string   "area"
    t.integer  "houses_dam_amount_order_total"
    t.string   "houses_dam_total_description"
    t.integer  "eq_depth"
    t.integer  "houses_amount_order_total"
    t.string   "houses_total_description"
    t.integer  "deaths_total"
    t.integer  "deaths_amount_order_total"
    t.string   "deaths_total_description"
    t.integer  "injuries_total"
    t.integer  "injuries_amount_order_total"
    t.string   "injuries_total_description"
    t.integer  "houses_destroyed_total"
    t.float    "ts_mt_ii"
    t.integer  "num_deposits"
    t.integer  "houses_amount_order"
    t.string   "houses_description"
    t.integer  "houses_damaged_amount_order"
    t.string   "houses_dam_description"
    t.float    "second"
    t.float    "eq_mag_mb"
    t.float    "eq_mag_mw"
    t.float    "eq_mag_ml"
    t.integer  "deaths_amount_order"
    t.string   "deaths_description"
    t.integer  "deaths"
    t.integer  "houses_destroyed"
    t.integer  "injuries"
    t.integer  "injuries_amount_order"
    t.string   "injuries_description"
    t.integer  "houses_damaged"
    t.integer  "houses_damaged_total"
    t.float    "damage_millions_dollars_total"
    t.float    "damage_millions_dollars"
    t.float    "eq_mag_unk"
    t.integer  "missing"
    t.integer  "missing_amount_order"
    t.string   "missing_description"
    t.integer  "missing_total"
    t.integer  "missing_amount_order_total"
    t.string   "missing_total_description"
    t.float    "eq_mag_mfa"
    t.index ["wkb_geometry"], name: "tsunami_wkb_geometry_geom_idx", using: :gist
  end

  create_table "volcanic_eruptions", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry",                  limit: {:srid=>4326, :type=>"point"}
    t.integer  "year"
    t.integer  "vei"
    t.integer  "vol_id"
    t.string   "assoc_eq"
    t.string   "assoc_tsu"
    t.string   "comments"
    t.integer  "damage_amount_order"
    t.string   "damage_description"
    t.integer  "deaths_amount_order"
    t.string   "deaths_description"
    t.integer  "damage_amount_order_total"
    t.string   "damage_total_description"
    t.integer  "deaths_amount_order_total"
    t.string   "deaths_total_description"
    t.integer  "signif"
    t.integer  "validity"
    t.string   "num"
    t.string   "name"
    t.string   "location"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "elevation"
    t.string   "morphology"
    t.string   "status"
    t.string   "time_erupt"
    t.integer  "id"
    t.string   "country"
    t.integer  "sig_id"
    t.integer  "tsu_id"
    t.integer  "haz_event_id"
    t.integer  "objectid"
    t.integer  "mo"
    t.integer  "day"
    t.integer  "fatalities"
    t.integer  "deaths"
    t.integer  "deaths_total"
    t.integer  "houses_amount_order"
    t.string   "houses_description"
    t.integer  "houses_amount_order_total"
    t.string   "houses_total_description"
    t.integer  "injuries"
    t.integer  "injuries_amount_order"
    t.string   "injuries_description"
    t.integer  "injuries_total"
    t.integer  "injuries_amount_order_total"
    t.string   "injuries_total_description"
    t.integer  "houses_destroyed"
    t.integer  "houses_destroyed_total"
    t.integer  "missing"
    t.integer  "missing_amount_order"
    t.string   "missing_description"
    t.integer  "missing_total"
    t.integer  "missing_amount_order_total"
    t.string   "missing_total_description"
    t.float    "damage_millions_dollars"
    t.float    "damage_millions_dollars_total"
    t.integer  "num_slides"
    t.index ["wkb_geometry"], name: "volcanic_eruptions_wkb_geometry_geom_idx", using: :gist
  end

  create_table "wind", primary_key: "ogc_fid", force: :cascade do |t|
    t.geometry "wkb_geometry",     limit: {:srid=>4326, :type=>"point"}
    t.integer  "objectid"
    t.string   "icao"
    t.string   "stationname"
    t.string   "country"
    t.string   "utc_datetime"
    t.float    "latitude"
    t.float    "longitude"
    t.integer  "elevation"
    t.integer  "temperature"
    t.integer  "dewpoint"
    t.integer  "relativehumidity"
    t.float    "pressure"
    t.float    "windchill"
    t.integer  "winddirection"
    t.integer  "windspeed"
    t.string   "visibility"
    t.string   "skycondition"
    t.integer  "windgust"
    t.string   "weather"
    t.float    "heatindex"
    t.string   "remarks"
    t.index ["wkb_geometry"], name: "wind_wkb_geometry_geom_idx", using: :gist
  end
end
