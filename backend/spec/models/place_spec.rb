require 'rails_helper'

RSpec.describe Place do
  # These two points are 1.12km apart
  let!(:home) { create(:place, longitude: -82.548984, latitude: 35.611965) }
  let!(:burritos) { create(:place, longitude: -82.555123, latitude: 35.620708) }

  describe 'the interects scope' do
    it 'returns the places that intersect the area' do
      factory = ::RGeo::Geographic.spherical_factory(:srid => 4326)
      area = factory.point(-82.548984, 35.611965).buffer(1120)
      places = Place.intersects(area)
      expect(places.count).to eq(2)
      expect(places.map(&:name).sort).to eq([home, burritos].map(&:name).sort)
    end

    it 'skips places outside the radius' do
      factory = ::RGeo::Geographic.spherical_factory(:srid => 4326)
      area = factory.point(-82.548984, 35.611965).buffer(1110)
      places = Place.intersects(area)
      expect(places.count).to eq(1)
      expect(places.map(&:name).sort).to eq([home].map(&:name))
    end
  end

  describe 'saving with latitude and longitude' do
    it 'turns the lat/lon into a POINT' do
      p = create(:place, longitude: 21.345, latitude: 84.234)
      expect(p.coord.lon).to eq(21.345)
      expect(p.coord.lat).to eq(84.234)
    end
  end

  describe 'serializing to json' do
    it 'does not include the coord' do
      json = burritos.as_json
      expect(json['coord']).to be nil
    end

    it 'includes the raw lat and lon' do
      json = burritos.as_json
      expect(json['latitude']).to eq(35.620708)
      expect(json['longitude']).to eq(-82.555123)
    end
  end
end
