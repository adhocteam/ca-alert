class AddFieldsToHazards < ActiveRecord::Migration[5.0]
  def change
    add_column :hazards, :category, :string
    add_column :hazards, :link_title, :string
  end
end
