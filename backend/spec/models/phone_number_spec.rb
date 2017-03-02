require 'rails_helper'

RSpec.describe PhoneNumber do
  let(:user) { create(:user) }
  let(:now) { Time.now }

  before do
    Timecop.freeze(now)
  end

  after do
    Timecop.return
  end

  describe 'creating a phone number' do
    it 'lets me create one' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn).to be_valid
    end

    it 'sets the pin' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn.pin).to be
      expect(pn.pin.length).to eq(5)
    end

    it 'sets the pin attempts' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn.pin_attempts).to eq(0)
    end

    it 'sets the pin created at' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn.pin_created_at).to eq(now)
    end
  end

  describe 'sending an alert' do
    let!(:alert) { create(:alert) }
    let!(:phone_number) { create(:phone_number) }

    it 'sends it to twilio' do
      alert.hazard.update_attributes(is_emergency: false)
      FakeTwilio.messages = []
      phone_number.alert_user(alert)
      expect(FakeTwilio.messages.count).to eq(1)
      expect(FakeTwilio.messages.first.body).to eq(<<-EOM)
New Alert from CAlerts!
Title: #{alert.hazard.title}
Message: #{alert.hazard.message}
Address: #{alert.hazard.address}
Category: #{alert.hazard.category}
Link: #{alert.hazard.link}
Phone: #{alert.hazard.phone_number}
EOM
    end

    it 'has a different message for emergencies' do
      alert.hazard.update_attributes(is_emergency: true)
      FakeTwilio.messages = []
      phone_number.alert_user(alert)
      expect(FakeTwilio.messages.count).to eq(1)
      expect(FakeTwilio.messages.first.body).to eq(<<-EOM)
New EMERGENCY Alert from CAlerts!
Title: #{alert.hazard.title}
Message: #{alert.hazard.message}
Address: #{alert.hazard.address}
Category: #{alert.hazard.category}
Link: #{alert.hazard.link}
Phone: #{alert.hazard.phone_number}
EOM
    end
  end
end
