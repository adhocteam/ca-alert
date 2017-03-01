require 'rails_helper'

RSpec.describe Alert do
  let!(:burrito_shop) { create(:place, longitude: -82.555123, latitude: 35.620708, user: user) }
  let!(:user) { create(:user) }
  let!(:phone_number1) { create(:phone_number, user: user) }
  let!(:phone_number2) { create(:phone_number, user: user) }

  describe 'creating an alert' do
    it 'counts the number of notifications sent' do
      h = create(:hazard, longitude: -82.555123, latitude: 35.620708, radius_in_meters: 100_000)
      expect(h.alerts.count).to eq(1)
      expect(h.alerts.first.email_notifications_sent).to eq(1)
      expect(h.alerts.first.sms_notifications_sent).to eq(2)
      expect(h.as_json['users_notified']).to eq(1)
    end
  end
end
