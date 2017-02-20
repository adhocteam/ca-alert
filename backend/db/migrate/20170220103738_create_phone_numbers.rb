class CreatePhoneNumbers < ActiveRecord::Migration[5.0]
  def change
    create_table :phone_numbers do |t|
      t.references :user
      t.string :phone_number
      t.string :pin
      t.timestamp :pin_created_at
      t.integer :pin_attempts
      t.boolean :verified, default: false
      t.timestamps
    end
  end
end
