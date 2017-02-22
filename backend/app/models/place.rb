class Place < ApplicationRecord
  include Swagger::Blocks
  include HasLonLat

  belongs_to :user
  has_many :alerts, dependent: :destroy

  validates :address, presence: true
  validates :name, presence: true

  scope :within_radius_of, lambda { |lon, lat, radius_in_meters|
    where("ST_DWithin(lonlat, ST_MakePoint(#{lon}, #{lat})::geography, #{radius_in_meters})")
  }

  swagger_schema :Place, required: [:id, :user_id, :latitude, :longitude, :name, :address, :created_at, :updated_at] do
    property :id do
      key :type, :integer
      key :format, :int64
    end
    property :user_id do
      key :type, :integer
      key :format, :int64
    end
    property :latitude do
      key :type, :number
      key :format, :float
    end
    property :longitude do
      key :type, :number
      key :format, :float
    end
    property :name do
      key :type, :string
    end
    property :address do
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
end
