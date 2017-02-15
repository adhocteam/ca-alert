require 'rails_helper'

RSpec.describe PingController, type: :request do
  it 'should create a user' do
    get '/ping'
    expect(response).to be_success
    expect(response.body).to eq('success')
  end
end
