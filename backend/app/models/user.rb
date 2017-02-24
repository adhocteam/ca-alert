class User < ActiveRecord::Base
  include Swagger::Blocks

  rolify after_add: :notify_when_becoming_an_admin

  swagger_schema :User, required: [:id, :provider, :uid, :name, :nickname, :image, :email, :created_at, :updated_at] do
    property :id do
      key :type, :integer
      key :format, :int64
    end
    property :provider do
      key :type, :string
    end
    property :uid do
      key :type, :string
    end
    property :name do
      key :type, :string
    end
    property :nickname do
      key :type, :string
    end
    property :image do
      key :type, :string
    end
    property :email do
      key :type, :string
    end
    property :email_notifications_enabled do
      key :type, :string
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

  # Include default devise modules.
  devise(
    :database_authenticatable,
    :registerable,
    :recoverable,
    :rememberable,
    :trackable,
    :validatable,
    :confirmable,
    # :omniauthable
  )
  include DeviseTokenAuth::Concerns::User

  has_many :places, dependent: :destroy
  has_many :phone_numbers, dependent: :destroy
  has_many :alerts, through: :places

  scope :confirmed, -> { where.not(confirmed_at: nil) }

  def self.search(query:)
    confirmed
      .joins('LEFT OUTER JOIN phone_numbers ON phone_numbers.user_id = users.id')
      .where('email LIKE ? OR phone_numbers.phone_number LIKE ?', "%#{query}%", "%#{query}%")
  end

  def as_json(options = {})
    h = super(options)
    h['is_admin'] = has_role?(:admin)
    h
  end

  private

  def notify_when_becoming_an_admin(role)
    if role.name == 'admin'
      AdminMailer.announce_new_admin_role(self).deliver_now
    end
  end
end
