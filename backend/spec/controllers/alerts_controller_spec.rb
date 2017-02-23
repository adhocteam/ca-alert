require 'rails_helper'

RSpec.describe AlertsController, type: :request do
  let(:email) { Faker::Internet.email }
  let(:password) { Faker::Internet.password }
  let!(:user) { create(:confirmed_user, email: email, password: password) }
  let!(:burrito_shop) { create(:place, longitude: -82.555123, latitude: 35.620708, user: user) }

  context 'with a hazard that creates an alert for the user' do
    let!(:hazard) { create(:hazard, longitude: -82.548984, latitude: 35.611965, radius_in_meters: 2000) }

    it 'creates the alert' do
      expect(user.alerts.count).to eq(1)
    end

    context 'with a logged-in user' do
      before do
        post '/auth/sign_in', params: { email: email, password: password }
        @client = response.headers['client']
        @access_token = response.headers['access-token']
      end

      describe 'listing the alerts' do
        it 'shows the alerts' do
          get(
            '/alerts',
            headers: {
              uid: email,
              client: @client,
              'access-token' => @access_token
            }
          )
          expect(response.status).to eq(200)
          json = JSON.parse(response.body)
          expect(json['data'][0]['hazard']['id']).to eq(hazard.id)
          expect(json['data'][0]['place']['id']).to eq(burrito_shop.id)
        end
      end
    end
  end
end
