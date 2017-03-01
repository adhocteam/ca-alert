require 'rails_helper'

RSpec.describe Hazard do
  let!(:burrito_shop) { create(:place, longitude: -82.555123, latitude: 35.620708, user: user) }
  let!(:user) { create(:user) }
  let!(:phone_number) { create(:phone_number, user: user) }
  let!(:gas_leak) { create(:hazard, longitude: -82.548984, latitude: 35.611965, radius_in_meters: 10) }

  describe 'saving with latitude and longitude' do
    it 'turns the lat/lon into a POINT' do
      h = create(:hazard, longitude: 21.345, latitude: 84.234)
      expect(h.coord.lon).to eq(21.345)
      expect(h.coord.lat).to eq(84.234)
    end
  end

  describe 'saving with lat/lng and radius' do
    it 'creates an alert area buffer' do
      pt = [-87.9, 41.9]
      radius = 1000
      factory = ::RGeo::Geographic.spherical_factory(:srid => 4326)
      poly = factory.point(*pt).buffer(radius)
      h = create(:hazard, longitude: pt[0], latitude: pt[1], radius_in_meters: radius)
      expect(geogs_equal(h.alert_area, poly)).to eq(true)
    end
  end

  describe 'saving with lat/lng, radius, and alert area' do
    it "doesn't overwrite existing alert area" do
      pt = [-87.9, 41.9]
      radius = 1000
      factory = ::RGeo::Geographic.spherical_factory(:srid => 4326)
      alert_area = factory.point(-88, 42).buffer(1500)
      h = create(:hazard, longitude: pt[0], latitude: pt[1], radius_in_meters: radius, alert_area: alert_area)
      expect(geogs_equal(h.alert_area, alert_area)).to eq(true)
    end
  end

  describe 'serializing to json' do
    it 'does not include the coord' do
      json = gas_leak.as_json
      expect(json['coord']).to be nil
    end

    it 'includes the raw lat and lon' do
      json = gas_leak.as_json
      expect(json['latitude']).to eq(35.611965)
      expect(json['longitude']).to eq(-82.548984)
    end
  end

  describe 'creating alerts' do
    let!(:hazard) { create(:hazard, longitude: -82.548984, latitude: 35.611965, radius_in_meters: 1140) }

    it 'creates alerts when the hazard covers a place' do
      expect(Alert.count).to eq(1)
    end

    it 'sends an email to the user about the alert' do
      expect(ActionMailer::Base.deliveries.count).to eq(1)
      mail = ActionMailer::Base.deliveries[0]
      expect(mail.subject).to eq('New Alert From CAlerts!')
      expect(mail.to).to eq([user.email])
    end

    it 'sends an SMS to the user about the alert' do
      expect(FakeTwilio.messages.count).to eq(2)
      msg = FakeTwilio.messages.last
      expect(msg.to).to eq(phone_number.phone_number)
      expect(msg.from).to eq(PhoneNumber::SMS_FROM_NUMBER)
      expect(msg.body).to match(/New Alert from CAlerts/)
    end
  end

  describe 'creating alerts with notifications disabled' do
    before do
      user.update_attribute(:email_notifications_enabled, false)
      phone_number.update_attribute(:notifications_enabled, false)
      ActionMailer::Base.deliveries = []
      FakeTwilio.messages = []
      create(:hazard, longitude: -82.548984, latitude: 35.611965, radius_in_meters: 1140)
    end

    it 'creates alerts when the hazard covers a place' do
      expect(Alert.count).to eq(1)
    end

    it 'does not send an email to the user about the alert' do
      expect(ActionMailer::Base.deliveries.count).to eq(0)
    end

    it 'does not send an SMS to the user about the alert' do
      expect(FakeTwilio.messages.count).to eq(0)
    end
  end
end

def geogs_equal(a, b)
  # equality testing on RGeo geographic objects yields `[]' instead of `true'
  # for some reason (possible bug? it doesn't do this for geometry objects), so
  # !! to coerce it into right bool
  !!(a == b)
end
