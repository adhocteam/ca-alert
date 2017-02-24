class AddTimestamps < ActiveRecord::Migration[5.0]
  def change
    add_column :hazards, :created_at, :datetime
    add_column :hazards, :updated_at, :datetime
  end
end
