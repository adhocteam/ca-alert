class CreateAlerts < ActiveRecord::Migration[5.0]
  def change
    create_table :alerts do |t|
      t.references :place
      t.references :hazard
      t.timestamps
    end
  end
end
