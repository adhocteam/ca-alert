class AllowDisablingNotifications < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :email_notifications_enabled, :boolean, default: true
    add_column :phone_numbers, :notifications_enabled, :boolean, default: true
  end
end
