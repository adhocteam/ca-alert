class UseGeometryForPlacesAndHazards < ActiveRecord::Migration[5.0]
  def change
    add_column :places, :lonlat, :st_point, geographic: true
    add_column :hazards, :lonlat, :st_point, geographic: true

    Place.all.each do |place|
      place.lonlat = "POINT (#{place.longitude} #{place.latitude})"
      place.save
    end

    Hazard.all.each do |hazard|
      hazard.lonlat = "POINT (#{hazard.longitude} #{hazard.latitude})"
      hazard.save
    end
  end
end
