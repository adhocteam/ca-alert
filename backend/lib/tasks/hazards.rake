namespace :hazards do
  desc "Create hazards from government data in other models"
  task from_govt: :environment do
    radius_in_meters = 25 * 1000
    creator_id = 0
    source = "government"

    ActiveRecord::Base.transaction do

      Drought.all.each do |d|
        pt = d.wkb_geometry.centroid

        h = Hazard.new
        h.longitude = pt.coordinates[0]
        h.latitude = pt.coordinates[1]
        h.title = d.label
        h.message = d.label
        h.radius_in_meters = radius_in_meters
        h.address = "(#{pt.coordinates[0]}, #{pt.coordinates[1]})"
        h.link = "http://www.cpc.ncep.noaa.gov/products/Drought/"
        h.phone_number = ""
        h.creator_id = creator_id
        h.category = "Drought"
        h.link_title = ""
        h.source = source
        h.save!
      end

      Earthquake.all.each do |e|
        pt = e.wkb_geometry

        h = Hazard.new
        h.longitude = pt.coordinates[0]
        h.latitude = pt.coordinates[1]
        h.title = "Magnitude #{e.magnitude} earthquake #{e.location}"
        h.message = "A magnitude #{e.magnitude} earthquake struck #{e.location} at a depth of #{e.depth} kilometers."
        h.radius_in_meters = radius_in_meters
        h.address = "(#{pt.coordinates[0]}, #{pt.coordinates[1]})"
        h.link = e.link
        h.phone_number = ""
        h.creator_id = creator_id
        h.category = "Earthquake"
        h.link_title = ""
        h.source = source
        h.save!
      end

      Fire.all.each do |f|
        pt = f.wkb_geometry

        h = Hazard.new
        h.longitude = pt.coordinates[0]
        h.latitude = pt.coordinates[1]
        h.title = "#{f.incidentname} wildfire in #{f.state}"
        h.message = <<EOF
The #{f.incidentname} wildfire in the state of #{f.state} is #{f.acres} acres in size and is #{f.percentcontained}% contained. The cause is #{f.firecause}.
EOF
        h.radius_in_meters = radius_in_meters
        h.address = "(#{pt.coordinates[0]}, #{pt.coordinates[1]})"
        h.link = f.hotlink
        h.phone_number = ""
        h.creator_id = creator_id
        h.category = "Fire"
        h.link_title = ""
        h.source = source
        h.save!
      end

      Flood.all.each do |f|
        pt = f.wkb_geometry

        h = Hazard.new
        h.longitude = pt.coordinates[0]
        h.latitude = pt.coordinates[1]
        h.title = "#{f.waterbody}: #{f.status}"
        h.message = <<EOF
#{f.waterbody} is experiencing #{f.status} and is at #{f.stage} #{f.units}.
EOF
        h.radius_in_meters = radius_in_meters
        h.address = "(#{pt.coordinates[0]}, #{pt.coordinates[1]})"
        h.link = f.link
        h.phone_number = ""
        h.creator_id = creator_id
        h.category = "Flood"
        h.link_title = ""
        h.source = source
        h.save!
      end

      #Hurricanes.all.each do |h|
      #end

      Precipitation.all.each do |p|
        pt = p.wkb_geometry.centroid

        h = Hazard.new
        h.longitude = pt.coordinates[0]
        h.latitude = pt.coordinates[1]
        h.title = "Precipitation: #{p.label}"
        h.message = <<EOF
#{p.label}
EOF
        h.radius_in_meters = radius_in_meters
        h.address = "(#{pt.coordinates[0]}, #{pt.coordinates[1]})"
        h.link = ""
        h.phone_number = ""
        h.creator_id = creator_id
        h.category = "Precipitation"
        h.link_title = ""
        h.source = source
        h.save!
      end

      Temperature.all.each do |t|
        pt = t.wkb_geometry.centroid

        h = Hazard.new
        h.longitude = pt.coordinates[0]
        h.latitude = pt.coordinates[1]
        h.title = "Temperature: #{t.label}"
        h.message = <<EOF
#{t.label}
EOF
        h.radius_in_meters = radius_in_meters
        h.address = "(#{pt.coordinates[0]}, #{pt.coordinates[1]})"
        h.link = ""
        h.phone_number = ""
        h.creator_id = creator_id
        h.category = "Temperature"
        h.link_title = ""
        h.source = source
        h.save!
      end

      #Tsunami

      #Volcanic_Eruptions.all.each do |v|
      #

      Wind.where("windspeed > 0 AND windgust > 0").each do |w|
        pt = w.wkb_geometry

        h = Hazard.new
        h.longitude = pt.coordinates[0]
        h.latitude = pt.coordinates[1]
        h.title = "High winds: gusting to #{w.windgust} MPH"
        h.message = <<EOF
Wind gusts of up to #{w.windgust} MPH are forecast.
EOF
        h.radius_in_meters = radius_in_meters
        h.address = "(#{pt.coordinates[0]}, #{pt.coordinates[1]})"
        h.link = ""
        h.phone_number = ""
        h.creator_id = creator_id
        h.category = "Wind"
        h.link_title = ""
        h.source = source
        h.save!
      end

    end
  end

end
