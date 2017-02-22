require 'rails_helper'

RSpec.describe Admin::HazardsController, type: :request do
  let(:title) { Faker::Lorem.sentence }
  let(:message) { Faker::Lorem.paragraph }
  let(:latitude) { Faker::Address.latitude }
  let(:longitude) { Faker::Address.longitude }
  let(:radius) { Faker::Number.decimal(2) }
  let(:address) { Faker::Lorem.sentence }
  let(:url) { Faker::Internet.url }
  let(:phone_number) { Faker::PhoneNumber.phone_number }

  context 'with a logged-in admin' do
    let(:admin_email) { Faker::Internet.email }
    let(:admin_password) { Faker::Internet.password }
    let!(:admin) { create(:admin_user, email: admin_email, password: admin_password) }

    before do
      post '/auth/sign_in', params: { email: admin_email, password: admin_password }
      @client = response.headers['client']
      @access_token = response.headers['access-token']
    end

    describe 'creating a hazard' do
      before do
        post(
          '/admin/hazards',
          headers: {
            uid: admin_email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            title: title,
            message: message,
            latitude: latitude,
            longitude: longitude,
            radius_in_meters: radius,
            address: address,
            link: url,
            phone_number: phone_number
          }
        )
      end

      it 'creates the hazard' do
        expect(response.status).to eq(200)
        expect(Hazard.count).to eq(1)
      end

      it 'sets the various fields' do
        expect(Hazard.first.title).to eq(title)
        expect(Hazard.first.message).to eq(message)
        expect(Hazard.first.coord.lat).to be_within(0.01).of(latitude.to_f)
        expect(Hazard.first.coord.lon).to be_within(0.01).of(longitude.to_f)
        expect(Hazard.first.radius_in_meters).to eq(radius.to_f)
        expect(Hazard.first.address).to eq(address)
        expect(Hazard.first.link).to eq(url)
        expect(Hazard.first.phone_number).to eq(phone_number)
      end

      it 'returns the hazard' do
        json = JSON.parse(response.body)
        expect(json['data']['title']).to eq(title)
      end

      it 'complains on bad data' do
        post(
          '/admin/hazards',
          headers: {
            uid: admin_email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
          }
        )
        expect(response.status).to eq(400)
        expect(JSON.parse(response.body)['errors']['title']).to eq(['can\'t be blank'])
      end
    end
  end

  context 'with a logged-in regular user' do
    let(:email) { Faker::Internet.email }
    let(:password) { Faker::Internet.password }
    let!(:user) { create(:confirmed_user, email: email, password: password) }

    before do
      post '/auth/sign_in', params: { email: email, password: password }
      @client = response.headers['client']
      @access_token = response.headers['access-token']
    end

    it 'does not create a hazard' do
      post(
        '/admin/hazards',
        headers: {
          uid: email,
          client: @client,
          'access-token' => @access_token
        },
        params: {
          title: title,
          message: message,
          latitude: latitude,
          longitude: longitude,
          radius_in_meters: radius,
          address: address,
          link: url,
          phone_number: phone_number
        }
      )
      expect(response.status).to eq(401)
      expect(Hazard.count).to eq(0)
    end
  end
end
