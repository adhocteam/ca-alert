require 'rails_helper'

RSpec.describe ApidocsController, type: :request do
  it 'returns the docs' do
    get '/apidocs'
    expect(response).to be_success
    json = JSON.parse(response.body)
    expect(json['swagger']).to eq('2.0')
  end
end
