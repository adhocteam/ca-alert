require 'rails_helper'

RSpec.describe Hazard do
  let!(:gas_leak) { create(:hazard, longitude: -82.548984, latitude: 35.611965, radius_in_meters: 10) }
  let!(:burrito_shop) { create(:place, longitude: -82.555123, latitude: 35.620708, user: user) }
  let!(:user) { create(:user) }
  let!(:phone_number) { create(:phone_number, user: user) }

  describe 'saving with latitude and longitude' do
    it 'turns the lat/lon into a POINT' do
      h = create(:hazard, longitude: 21.345, latitude: 84.234)
      expect(h.coord.lon).to eq(21.345)
      expect(h.coord.lat).to eq(84.234)
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
      expect(ActionMailer::Base.deliveries.count).to eq(2)
      mail = ActionMailer::Base.deliveries[1]
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
