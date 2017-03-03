require 'rails_helper'

RSpec.describe HazardsController, type: :request do
  describe 'listing the hazards' do
    context 'with a couple of existing hazards' do
      let!(:killer_clowns) { create(:hazard) }
      let!(:coffee_shortage) { create(:hazard) }

      before do
        get('/hazards')
      end

      it 'lists the hazards' do
        expect(response.status).to eq(200)
        json = JSON.parse(response.body)
        expect(json['data'].map { |i| i['id'] }).to eq([coffee_shortage.id, killer_clowns.id])
      end
    end
  end
end
