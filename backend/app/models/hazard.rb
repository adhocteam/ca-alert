class Hazard < ApplicationRecord
  include Swagger::Blocks
  include HasCoordinates

  belongs_to :creator, class_name: 'User'
  has_many :alerts, dependent: :destroy

  validates :title, presence: true
  validates :message, presence: true
  validates :radius_in_meters, presence: true

  after_create :store_current_user_count
  after_create :create_alerts
  before_save :buffer_centroid

  def as_json(options = {})
    h = super(options)
    h['email_notifications_sent'] = alerts.sum(&:email_notifications_sent)
    h['sms_notifications_sent'] = alerts.sum(&:sms_notifications_sent)
    h['users_notified'] = User.joins(:alerts).where(alerts: { hazard_id: id }).distinct.count
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
    property :users_notified do
      key :type, :integer
    end
    property :user_count_at_creation do
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

  def store_current_user_count
    # Not using User.count because for seeding the database there may technically be users
    # created in the future from when the hazard was created.
    update_attribute(:user_count_at_creation, User.where('created_at < ?', created_at).count)
  end

  def create_alerts
    Place.intersects(alert_area).each do |place|
      # This is here to support seeding the database, where creation times are not right now
      if place.created_at <= created_at
        Alert.create(place: place, hazard: self)
      end
    end
  end

  def buffer_centroid
    if alert_area.nil? && coord.lon.present? && coord.lat.present? && radius_in_meters.present?
      self.alert_area = coord.buffer(radius_in_meters)
    end
  end
end
