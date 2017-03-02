require 'rails_helper'

RSpec.describe 'authentication', type: :request do
  let(:email) { Faker::Internet.email }
  let(:password) { Faker::Internet.password }

  describe 'creating an account' do
    context 'with correct info' do
      before do
        post '/auth', params: { email: email, password: password, password_confirmation: password }
      end

      it 'should create a user' do
        expect(response).to be_success
        expect(User.count).to eq(1)
        expect(User.first.email).to eq(email)
      end

      it 'makes an unconfirmed user' do
        expect(User.first.confirmed_at).to eq(nil)
      end

      it 'emails the user' do
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        mail = ActionMailer::Base.deliveries.first
        expect(mail.subject).to eq('Confirmation instructions')
        expect(mail.from).to eq(['support@ca-alert-prototype.com'])
      end

      it 'has the correct link in the email' do
        expect(ActionMailer::Base.deliveries.count).to eq(1)
        mail = ActionMailer::Base.deliveries.first
        mail.body.raw_source =~ /redirect_url=([^"]*)/
        expect(URI.unescape($1)).to eq('http://localhost:8080/index.html#/account/signin')
      end

      describe 'with the account confirmed' do
        before do
          get user_confirmation_path(config: 'default', confirmation_token: User.first.confirmation_token, redirect_url: '/')
        end

        it 'confirms it and sets the time' do
          expect(response.status).to eq(302)
          expect(User.first.confirmed_at).not_to eq(nil)
        end

        it 'is unhappy about bogus credentials for login' do
          post '/auth/sign_in', params: { email: email, password: password + '!!!' }
          expect(response.status).to eq(401)
        end

        context 'with the user logged in' do
          before do
            post '/auth/sign_in', params: { email: email, password: password }
          end

          it 'lets me log in' do
            expect(response).to be_success
          end

          it 'sends the access-token in the headers' do
            expect(response.headers['access-token']).to be
            expect(response.headers['client']).to be
          end

          it 'lets me log out' do
            delete '/auth/sign_out', headers: {
              uid: email,
              client: response.headers['client'],
              'access-token' => response.headers['access-token']
            }
            expect(response).to be_success
          end

          it 'updates my account' do
            put(
              '/auth',
              headers: {
                uid: email,
                client: response.headers['client'],
                'access-token' => response.headers['access-token']
              },
              params: {
                password: password + '!!',
                password_confirmation: password + '!!'
              }
            )
            expect(response).to be_success
          end

          it 'lets me update email_notifications_enabled' do
            user = User.first
            expect(user.reload.email_notifications_enabled).to be true
            put(
              '/auth',
              headers: {
                uid: email,
                client: response.headers['client'],
                'access-token' => response.headers['access-token']
              },
              params: {
                email_notifications_enabled: false
              }
            )
            expect(response).to be_success
            expect(user.reload.email_notifications_enabled).to be false
          end

          it 'can delete the user' do
            delete '/auth', headers: {
              uid: email,
              client: response.headers['client'],
              'access-token' => response.headers['access-token']
            }
            expect(response).to be_success
          end

          it 'complains on deletion with invalid credentials' do
            delete '/auth', headers: {
              uid: email + '123',
              client: response.headers['client'] + '123',
              'access-token' => response.headers['access-token'] + '123'
            }
            expect(response).not_to be_success
          end
        end
      end
    end

    context 'with incorrect info' do
      before do
        post '/auth', params: { email: email, password: password, password_confirmation: password + 'foo' }
      end

      it 'should not create a user' do
        expect(response).not_to be_success
        expect(User.count).to eq(0)
      end
    end
  end
end
