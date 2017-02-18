require 'rails_helper'

RSpec.describe PlacesController, type: :request do
  let(:email) { Faker::Internet.email }
  let(:password) { Faker::Internet.password }
  let(:place_name) { Faker::Friends.location }
  let(:latitude) { Faker::Address.latitude.to_f }
  let(:longitude) { Faker::Address.longitude.to_f }
  let(:address) { Faker::Address.street_address }
  let!(:user) { create(:confirmed_user, email: email, password: password, password_confirmation: password) }

  context 'with a logged-in user' do
    before do
      post '/auth/sign_in', params: { email: email, password: password }
      @client = response.headers['client']
      @access_token = response.headers['access-token']
    end

    describe 'creating a place' do
      it 'creates the place' do
        post(
          '/places',
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            name: place_name,
            latitude: latitude,
            longitude: longitude,
            address: address
          }
        )
        expect(response.status).to eq(200)
        expect(Place.count).to eq(1)
        expect(Place.first.name).to eq(place_name)
      end

      it 'complains on bad data' do
        post(
          '/places',
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            latitude: Faker::Address.latitude,
            longitude: Faker::Address.longitude,
            address: Faker::Address.street_address
          }
        )
        json = JSON.parse(response.body)
        expect(json['status']).to eq('error')
        expect(json['errors']['name']).to eq(['can\'t be blank'])
        expect(response.status).to eq(400)
      end
    end

    context 'with an existing place' do
      let!(:place) { create(:place, user: user, name: place_name, latitude: latitude, longitude: longitude, address: address) }

      describe 'listing the places' do
        it 'shows the places' do
          get(
            '/places',
            headers: {
              uid: email,
              client: @client,
              'access-token' => @access_token
            }
          )
          expect(response.status).to eq(200)
          expect(JSON.parse(response.body)['data'][0]['id']).to eq(place.id)
        end
      end

      describe 'updating the place' do
        let(:new_name) { Faker::Friends.location }
        let(:new_latitude) { Faker::Address.latitude.to_f }
        let(:new_longitude) { Faker::Address.longitude.to_f }
        let(:new_address) { Faker::Address.street_address }

        it 'makes the changes with good data' do
          patch(
            "/places/#{place.id}",
            headers: {
              uid: email,
              client: @client,
              'access-token' => @access_token
            },
            params: {
              name: new_name,
              latitude: new_latitude,
              longitude: new_longitude,
              address: new_address
            }
          )
          expect(response.status).to eq(200)
          place.reload
          expect(place.name).to eq(new_name)
          expect(place.latitude).to be_within(0.01).of(new_latitude)
          expect(place.longitude).to be_within(0.01).of(new_longitude)
          expect(place.address).to eq(new_address)
        end

        it 'hates bad data' do
          patch(
            "/places/#{place.id}",
            headers: {
              uid: email,
              client: @client,
              'access-token' => @access_token
            },
            params: {
              name: '',
              latitude: '',
              longitude: '',
              address: ''
            }
          )
          expect(response.status).to eq(400)
          place.reload
          expect(place.name).to eq(place_name)
          expect(place.latitude).to be_within(0.01).of(latitude)
          expect(place.longitude).to be_within(0.01).of(longitude)
          expect(place.address).to eq(address)
        end
      end

      describe 'deleting the place' do
        it 'gets rid of it' do
          delete(
            "/places/#{place.id}",
            headers: {
              uid: email,
              client: @client,
              'access-token' => @access_token
            }
          )
          expect(response.status).to eq(200)
          expect(Place.count).to eq(0)
        end

        it 'is unhappy about a non-existent place' do
          delete(
            "/places/#{place.id}7665",
            headers: {
              uid: email,
              client: @client,
              'access-token' => @access_token
            }
          )
          expect(response.status).to eq(404)
          expect(Place.count).to eq(1)
        end
      end
    end
  end
end
