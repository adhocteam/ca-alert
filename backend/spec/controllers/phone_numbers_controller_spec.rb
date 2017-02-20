require 'rails_helper'

RSpec.describe PhoneNumbersController, type: :request do
  let(:email) { Faker::Internet.email }
  let(:password) { Faker::Internet.password }
  let(:number) { Faker::PhoneNumber.phone_number }
  let!(:user) { create(:confirmed_user, email: email, password: password, password_confirmation: password) }

  context 'with a logged-in user' do
    before do
      post '/auth/sign_in', params: { email: email, password: password }
      @client = response.headers['client']
      @access_token = response.headers['access-token']
    end

    describe 'creating a phone number' do
      it 'creates the number' do
        post(
          '/phone_numbers',
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            phone_number: number
          }
        )
        expect(response.status).to eq(200)
        expect(PhoneNumber.count).to eq(1)
        expect(user.phone_numbers.count).to eq(1)
        expect(PhoneNumber.first.phone_number).to eq(number)
      end

      it 'does not return the PIN' do
        post(
          '/phone_numbers',
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            phone_number: number
          }
        )
        json = JSON.parse(response.body)
        expect(json['data'].key?('pin')).to be false
      end

      it 'complains on bad data' do
        post(
          '/phone_numbers',
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
          }
        )
        json = JSON.parse(response.body)
        expect(json['status']).to eq('error')
        expect(json['errors']['phone_number']).to eq(['can\'t be blank'])
        expect(response.status).to eq(400)
        expect(PhoneNumber.count).to eq(0)
      end
    end

    describe 'verifying the phone number' do
      let(:phone_number) { create(:phone_number, user: user) }

      it 'verifies it when I send the correct code' do
        patch(
          "/phone_numbers/#{phone_number.id}/verify",
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            pin: phone_number.pin
          }
        )
        expect(response.status).to eq(200)
        expect(phone_number.reload.verified).to be true
        json = JSON.parse(response.body)
        expect(json['data']['verified']).to eq(true)
      end

      it 'gives a 404 for a phone number that doesn\'t belong to the user' do
        patch(
          "/phone_numbers/1342343/verify",
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            pin: phone_number.pin
          }
        )
        expect(response.status).to eq(404)
      end

      it 'tells me when I get the PIN wrong' do
        patch(
          "/phone_numbers/#{phone_number.id}/verify",
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            pin: phone_number.pin + '32432423'
          }
        )
        expect(response.status).to eq(400)
        expect(phone_number.reload.verified).to be false
      end

      it 'increments the failed count when getting it wrong' do
        patch(
          "/phone_numbers/#{phone_number.id}/verify",
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            pin: phone_number.pin + '32432423'
          }
        )
        expect(phone_number.reload.pin_attempts).to eq(1)
      end
    end

    describe 'deleting a phone number' do
      let(:phone_number) { create(:phone_number, user: user) }

      it 'deletes it' do
        delete(
          "/phone_numbers/#{phone_number.id}",
          headers: {
            uid: email,
            client: @client,
            'access-token' => @access_token
          }
        )
        expect(response.status).to eq(200)
        expect(JSON.parse(response.body)).to eq('status' => 'success')
        expect(PhoneNumber.where(id: phone_number.id).any?).to eq(false)
      end
    end

    it 'requires a logged-in user' do
      post(
        '/phone_numbers',
        headers: {
          uid: email
        },
        params: {
          phone_number: number
        }
      )
      json = JSON.parse(response.body)
      expect(json['errors']).to eq(['Authorized users only.'])
      expect(response.status).to eq(401)
      expect(PhoneNumber.count).to eq(0)
      expect(user.phone_numbers.count).to eq(0)
    end
  end
end
