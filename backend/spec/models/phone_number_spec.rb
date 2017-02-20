require 'rails_helper'

RSpec.describe PhoneNumber do
  let(:user) { create(:user) }
  let(:now) { Time.now }

  before do
    Timecop.freeze(now)
  end

  after do
    Timecop.return
  end

  describe 'creating a phone number' do
    it 'lets me create one' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn).to be_valid
    end

    it 'sets the pin' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn.pin).to be
      expect(pn.pin.length).to eq(5)
    end

    it 'sets the pin attempts' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn.pin_attempts).to eq(0)
    end

    it 'sets the pin created at' do
      pn = user.phone_numbers.create(
        phone_number: '555-555-5555'
      )
      expect(pn.pin_created_at).to eq(now)
    end
  end
end
