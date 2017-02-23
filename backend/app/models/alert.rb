class Alert < ApplicationRecord
  belongs_to :place
  belongs_to :hazard

  after_create :notify_user

  private

  def notify_user
    HazardNotificationMailer.alert_user(self).deliver_now
    place.user.phone_numbers.each do |pn|
      pn.alert_user(self)
    end
  end
end
