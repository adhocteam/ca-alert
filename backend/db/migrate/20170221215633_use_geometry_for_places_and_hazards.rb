class UseGeometryForPlacesAndHazards < ActiveRecord::Migration[5.0]
  def change
    add_column :places, :coord, :st_point, geographic: true
    add_column :hazards, :coord, :st_point, geographic: true

    Place.all.each do |place|
      place.coord = "POINT (#{place.longitude} #{place.latitude})"
      place.save!
    end

    Hazard.all.each do |hazard|
      hazard.coord = "POINT (#{hazard.longitude} #{hazard.latitude})"
      hazard.save!
    end

    remove_column :places, :latitude, :float
    remove_column :places, :longitude, :float
    remove_column :hazards, :latitude, :float
    remove_column :hazards, :longitude, :float
  end
end
