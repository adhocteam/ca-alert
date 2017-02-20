class User < ActiveRecord::Base
  include Swagger::Blocks

  rolify

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

  has_many :places
  has_many :phone_numbers

  scope :confirmed, -> { where.not(confirmed_at: nil) }

  def self.search(query:)
    confirmed.where('email LIKE ?', "%#{query}%")
  end

  def as_json(options = {})
    h = super(options)
    h['is_admin'] = has_role?(:admin)
    h
  end
end
