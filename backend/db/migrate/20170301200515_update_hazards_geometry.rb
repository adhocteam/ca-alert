class UpdateHazardsGeometry < ActiveRecord::Migration[5.0]
  def change
    add_column :hazards, :alert_area, :st_polygon, geographic: true
    add_index :hazards, :alert_area, using: :gist

    add_column :hazards, :source, :string, default: "admin"

    Hazard.all.each do |h|
      h.alert_area = h.coord.buffer(h.radius_in_meters)
      h.source = "admin"
      h.save!
    end
  end
end
