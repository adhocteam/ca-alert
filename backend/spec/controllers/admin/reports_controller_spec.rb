require 'rails_helper'

RSpec.describe Admin::ReportsController, type: :request do
  context 'with a logged-in admin' do
    let(:admin_email) { Faker::Internet.email }
    let(:admin_password) { Faker::Internet.password }
    let!(:admin) { create(:admin_user, email: admin_email, password: admin_password, email_notifications_enabled: false) }

    before do
      post '/auth/sign_in', params: { email: admin_email, password: admin_password }
      @client = response.headers['client']
      @access_token = response.headers['access-token']
    end

    describe 'the communication methods report' do
      context 'with a bunch of users and phone numbers' do
        let!(:user1) { create(:user) }
        let!(:user2) { create(:user) }
        let!(:user3) { create(:user) }
        let!(:user4) { create(:user) }
        let!(:user5) { create(:user, email_notifications_enabled: false) }
        let!(:user6) { create(:user) }
        let!(:pn1) { create(:phone_number) }
        let!(:pn2) { create(:phone_number) }
        let!(:pn3) { create(:phone_number, notifications_enabled: false) }
        let!(:pn4) { create(:phone_number) }
        let!(:pn5) { create(:phone_number, notifications_enabled: false) }
        let!(:pn6) { create(:phone_number) }

        describe 'getting the report' do
          before do
            get(
              '/admin/reports/communication_methods',
              headers: {
                uid: admin_email,
                client: @client,
                'access-token' => @access_token
              }
            )
          end

          it 'returns the correct data' do
            expect(response.status).to eq(200)
            json = JSON.parse(response.body)
            expect(json['data']['emails']).to eq(5)
            expect(json['data']['phone_numbers']).to eq(4)
          end
        end
      end
    end

    describe 'the alerts report' do
      context 'with a bunch of alerts' do
        let!(:alert1) { create(:alert) }
        let!(:alert2) { create(:alert) }
        let!(:alert3) { create(:alert) }
        let!(:alert4) { create(:alert) }
        let!(:alert5) { create(:alert) }
        let!(:alert6) { create(:alert) }

        describe 'getting the report' do
          before do
            get(
              '/admin/reports/alerts',
              headers: {
                uid: admin_email,
                client: @client,
                'access-token' => @access_token
              },
              params: {
                days_back: 0
              }
            )
          end

          it 'returns the correct data' do
            expect(response.status).to eq(200)
            json = JSON.parse(response.body)
            expect(json['data']).to eq(Date.current.to_s => 6)
          end
        end
      end
    end

    describe 'the users report' do
      context 'with a bunch of alerts' do
        let!(:user1) { create(:user) }
        let!(:user2) { create(:user) }
        let!(:user3) { create(:user) }
        let!(:user4) { create(:user) }

        describe 'getting the report' do
          before do
            get(
              '/admin/reports/users',
              headers: {
                uid: admin_email,
                client: @client,
                'access-token' => @access_token
              },
              params: {
                days_back: 0
              }
            )
          end

          it 'returns the correct data' do
            expect(response.status).to eq(200)
            json = JSON.parse(response.body)
            expect(json['data']).to eq(Date.current.to_s => 5) # because it includes the admin
          end
        end
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

    it 'is highly displeased' do
      get(
        '/admin/reports/communication_methods',
        headers: {
          uid: email,
          client: @client,
          'access-token' => @access_token
        }
      )
      expect(response.status).to eq(401)
    end
  end
end
