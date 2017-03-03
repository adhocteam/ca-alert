class HazardsController < ApplicationController

  def index
    render(
      json: {
        status: 'success',
        data: Hazard.all.order(created_at: 'desc').limit(10).reverse
      },
      status: 200
    )
  end
end
