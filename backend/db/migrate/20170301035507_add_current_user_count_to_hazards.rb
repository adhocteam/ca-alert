class AddCurrentUserCountToHazards < ActiveRecord::Migration[5.0]
  def change
    add_column :hazards, :user_count_at_creation, :integer, default: 0
  end
end
