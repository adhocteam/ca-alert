class CreateHazards < ActiveRecord::Migration[5.0]
  def change
    create_table :hazards do |t|
      t.string :title
      t.text :message
      t.float :latitude
      t.float :longitude
      t.float :radius_in_meters
      t.string :address
      t.string :link
      t.string :phone_number
      t.references :creator
    end
  end
end
