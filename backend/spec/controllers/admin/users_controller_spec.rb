require 'rails_helper'

RSpec.describe Admin::UsersController, type: :request do
  let!(:password) { Faker::Internet.password }
  let!(:user1) { create(:confirmed_user, password: password) }
  let!(:user2) { create(:confirmed_user, password: password) }
  let!(:user3) { create(:confirmed_user, password: password) }
  let!(:unconfirmed_user) { create(:user, password: password) }
  let!(:admin) { create(:admin_user, password: password) }
  let!(:user1_number) { create(:phone_number, user: user1, verified: true) }
  let!(:user2_number) { create(:phone_number, user: user2, verified: true) }
  let!(:user3_number) { create(:phone_number, user: user3, verified: false) }

  describe 'user search' do
    context 'with a logged-in regular user' do
      before do
        post '/auth/sign_in', params: { email: user1.email, password: password }
        @client = response.headers['client']
        @access_token = response.headers['access-token']
      end

      it 'requires me to be an admin' do
        get(
          '/admin/users/search',
          headers: {
            uid: user1.email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            q: 'blahblah'
          }
        )
        expect(response.status).to eq(401)
        expect(JSON.parse(response.body)['errors']).to eq(['Unauthorized'])
      end
    end

    context 'with a logged-in admin' do
      before do
        post '/auth/sign_in', params: { email: admin.email, password: password }
        @client = response.headers['client']
        @access_token = response.headers['access-token']
      end

      it 'returns users on full email matches' do
        get(
          '/admin/users/search',
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            q: user2.email
          }
        )
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['data'].count).to eq(1)
        expect(json['data'][0]['id']).to eq(user2.id)
      end

      it 'returns users on full phone number matches' do
        get(
          '/admin/users/search',
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            q: user1_number.phone_number
          }
        )
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['data'].count).to eq(1)
        expect(json['data'][0]['id']).to eq(user1.id)
      end

      it 'returns users on partial email matches' do
        get(
          '/admin/users/search',
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            q: user3.email[0..4]
          }
        )
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['data'].count).to eq(1)
        expect(json['data'][0]['id']).to eq(user3.id)
      end

      it 'returns users on partial phone number matches' do
        get(
          '/admin/users/search',
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            q: user2_number.phone_number[0..6]
          }
        )
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['data'].count).to eq(1)
        expect(json['data'][0]['id']).to eq(user2.id)
      end

      it 'does not return unconfirmed users' do
        get(
          '/admin/users/search',
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          },
          params: {
            q: unconfirmed_user.email
          }
        )
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['data'].count).to eq(0)
      end
    end
  end

  describe 'makin a user an admin' do
    context 'with a logged-in regular user' do
      before do
        post '/auth/sign_in', params: { email: user1.email, password: password }
        @client = response.headers['client']
        @access_token = response.headers['access-token']
      end

      it 'requires me to be an admin' do
        patch(
          "/admin/users/#{user2.id}/make_admin",
          headers: {
            uid: user1.email,
            client: @client,
            'access-token' => @access_token
          }
        )
        expect(response.status).to eq(401)
        expect(JSON.parse(response.body)['errors']).to eq(['Unauthorized'])
      end
    end

    context 'with a logged-in admin' do
      before do
        post '/auth/sign_in', params: { email: admin.email, password: password }
        @client = response.headers['client']
        @access_token = response.headers['access-token']
      end

      it 'makes the user an admin' do
        patch(
          "/admin/users/#{user2.id}/make_admin",
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          }
        )
        expect(response.status).to eq(200)
        expect(user2).to have_role(:admin)
      end

      it 'emails the user to tell them the amazing news' do
        ActionMailer::Base.deliveries = []
        patch(
          "/admin/users/#{user2.id}/make_admin",
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          }
        )
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        mail = ActionMailer::Base.deliveries.first
        expect(mail.to).to eq([user2.email])
        expect(mail.subject).to eq('You are now an admin on CAlerts!')
      end

      it 'resends the email upon request' do
        patch(
          "/admin/users/#{user2.id}/make_admin",
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          }
        )
        ActionMailer::Base.deliveries = []
        patch(
          "/admin/users/#{user2.id}/resend_admin_email",
          headers: {
            uid: admin.email,
            client: @client,
            'access-token' => @access_token
          }
        )
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        mail = ActionMailer::Base.deliveries.first
        expect(mail.to).to eq([user2.email])
        expect(mail.subject).to eq('You are now an admin on CAlerts!')
      end
    end
  end
end
