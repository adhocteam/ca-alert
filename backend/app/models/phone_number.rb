class PhoneNumber < ApplicationRecord
  include Swagger::Blocks

  SMS_FROM_NUMBER = '+18282028536'.freeze

  belongs_to :user

  validates :phone_number, presence: true

  before_create :setup_pin

  def as_json(options = {})
    super(except: [:pin])
  end

  def alert_user(alert)
    Twilio::REST::Client.new.messages.create(
      from: SMS_FROM_NUMBER,
      to: phone_number,
      body: "New Alert from CAlerts! Title: #{alert.hazard.title} Message: #{alert.hazard.message}"
    )
  end

  swagger_schema :Place, required: [:id, :user_id, :phone_number, :pin_created_at, :pin_attempts, :verified, :created_at, :updated_at] do
    property :id do
      key :type, :integer
      key :format, :int64
    end
    property :user_id do
      key :type, :integer
      key :format, :int64
    end
    property :phone_number do
      key :type, :string
    end
    property :pin_created_at do
      key :type, :string
      key :format, 'date-time'
    end
    property :pin_attempts do
      key :type, :integer
    end
    property :verified do
      key :type, :boolean
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

  def setup_pin
    self.pin = rand(00_000..99_999).to_s.rjust(5, '0')
    self.pin_attempts = 0
    self.pin_created_at = Time.now.utc

    Twilio::REST::Client.new.messages.create(
      from: SMS_FROM_NUMBER,
      to: phone_number,
      body: "Your mobile pin for the California alerts system is #{pin}"
    )
  end
end
