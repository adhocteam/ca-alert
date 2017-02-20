require 'rails_helper'

RSpec.describe User do
  let(:user) { create(:user) }

  it 'sends an is_admin flag in the json' do
    expect(user.as_json['is_admin']).to be false
  end

  it 'sets the is_admin flag to true when we have an admin' do
    user.add_role(:admin)
    expect(user.as_json['is_admin']).to be true
  end
end
