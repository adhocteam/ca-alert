class AddCountsToAlerts < ActiveRecord::Migration[5.0]
  def change
    add_column :alerts, :sms_notifications_sent, :integer, default: 0
    add_column :alerts, :email_notifications_sent, :integer, default: 0
  end
end
