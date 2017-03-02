class AddIsEmergencyToHazards < ActiveRecord::Migration[5.0]
  def change
    add_column :hazards, :is_emergency, :boolean, default: true
  end
end
