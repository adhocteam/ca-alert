module HasCoordinates
  extend ActiveSupport::Concern

  included do
    attr_writer :latitude
    attr_writer :longitude

    before_save :convert_coordinates_to_geo
    validate :ensure_coordinates_present
  end

  def as_json(options = {})
    options[:except] ||= []
    options[:except] << :coord
    h = super(options)
    h['longitude'] = coord.lon
    h['latitude'] = coord.lat
    h
  end

  private

  def ensure_coordinates_present
    if @latitude.blank? && coord&.lat.blank?
      errors.add(:latitude, 'can\'t be blank')
    end
    if @longitude.blank? && coord&.lon.blank?
      errors.add(:longitude, 'can\'t be blank')
    end
  end

  def convert_coordinates_to_geo
    if @latitude && @longitude
      self.coord = "POINT (#{@longitude} #{@latitude})"
    end
  end
end
