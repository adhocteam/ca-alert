class UpdateHazardsGeometry < ActiveRecord::Migration[5.0]
  def change
    add_column :hazards, :alert_area, :st_polygon, geographic: true
    add_index :hazards, :alert_area, using: :gist

    Hazard.all.each do |h|
      h.alert_area = h.coord.buffer(h.radius_in_meters)
      h.save!
    end

    change_table :hazards do |t|
      t.rename :coord, :centroid
    end
  end
end
