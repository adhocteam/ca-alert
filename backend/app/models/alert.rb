class Alert < ApplicationRecord
  include Swagger::Blocks

  belongs_to :place
  belongs_to :hazard

  after_create :notify_user

  def as_json(options = {})
    options[:except] ||= []
    options[:except] += [:id, :place_id, :hazard_id]
    h = super(options)
    h['hazard'] = hazard.as_json
    h['place'] = place.as_json
    h
  end

  swagger_schema :Alert, required: [:created_at, :updated_at, :hazard, :place] do
    property :created_at do
      key :type, :string
      key :format, 'date-time'
    end
    property :updated_at do
      key :type, :string
      key :format, 'date-time'
    end
    property :hazard do
      key :'$ref', :Hazard
    end
    property :place do
      key :'$ref', :Place
    end
  end

  private

  def notify_user
    if place.user.email_notifications_enabled?
      HazardNotificationMailer.alert_user(self).deliver_now
    end
    place.user.phone_numbers.each do |pn|
      pn.alert_user(self)
    end
    update_attributes(
      email_notifications_sent: 1,
      sms_notifications_sent: place.user.phone_numbers.count
    )
  end
end
