class CreatePlaces < ActiveRecord::Migration[5.0]
  def change
    create_table :places do |t|
      t.references :user
      t.float :latitude
      t.float :longitude
      t.string :name
      t.text :address
      t.timestamps
    end
  end
end
