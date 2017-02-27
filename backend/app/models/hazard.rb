class Hazard < ApplicationRecord
  include Swagger::Blocks
  include HasCoordinates

  belongs_to :creator, class_name: 'User'
  has_many :alerts, dependent: :destroy

  validates :title, presence: true
  validates :message, presence: true
  validates :radius_in_meters, presence: true

  after_create :create_alerts

  def as_json(options = {})
    h = super(options)
    h['email_notifications_sent'] = alerts.sum(&:email_notifications_sent)
    h['sms_notifications_sent'] = alerts.sum(&:sms_notifications_sent)
    h
  end

  swagger_schema :Hazard, required: [:id, :title, :message, :latitude, :longitude, :radius_in_meters] do
    property :id do
      key :type, :integer
      key :format, :int64
    end
    property :title do
      key :type, :string
    end
    property :message do
      key :type, :string
    end
    property :latitude do
      key :type, :number
      key :format, :float
    end
    property :longitude do
      key :type, :number
      key :format, :float
    end
    property :radius_in_meters do
      key :type, :number
      key :format, :float
    end
    property :address do
      key :type, :string
    end
    property :link_title do
      key :type, :string
    end
    property :link do
      key :type, :string
    end
    property :phone_number do
      key :type, :string
    end
    property :category do
      key :type, :string
    end
    property :creator_id do
      key :type, :integer
      key :format, :int64
    end
    property :email_notification_count do
      key :type, :integer
    end
    property :sms_notification_count do
      key :type, :integer
    end
    property :created_at do
      key :type, :string
      key :format, 'date-time'
    end
    property :updated_at do
      key :type, :string
      key :format, 'date-time'
    end
  end

  private

  def create_alerts
    Place.within_radius_of(coord.lon, coord.lat, radius_in_meters).each do |place|
      # This is here to support seeding the database, where creation times are not right now
      if place.created_at <= created_at
        Alert.create(place: place, hazard: self)
      end
    end
  end
end
