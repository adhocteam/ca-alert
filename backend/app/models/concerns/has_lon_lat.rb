module HasLonLat
  extend ActiveSupport::Concern

  included do
    attr_writer :latitude
    attr_writer :longitude

    before_save :convert_coordinates_to_geo
    validate :ensure_coordinates_present
  end

  def as_json(options = {})
    h = super(except: [:lonlat])
    h['longitude'] = lonlat.x
    h['latitude'] = lonlat.y
    h
  end

  private

  def ensure_coordinates_present
    if @latitude.blank?
      errors.add(:latitude, 'can\'t be blank')
    end
    if @longitude.blank?
      errors.add(:longitude, 'can\'t be blank')
    end
  end

  def convert_coordinates_to_geo
    self.lonlat = "POINT (#{@longitude} #{@latitude})"
  end
end
