class Hazard < ApplicationRecord
  include Swagger::Blocks

  belongs_to :creator, class_name: 'User'

  validates :title, presence: true
  validates :message, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :radius_in_meters, presence: true

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
    property :link do
      key :type, :string
    end
    property :phone_number do
      key :type, :string
    end
    property :creator_id do
      key :type, :integer
      key :format, :int64
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
