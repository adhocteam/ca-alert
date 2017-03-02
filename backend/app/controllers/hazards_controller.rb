class HazardsController < ApplicationController

  def index
    render(
      json: {
        status: 'success',
        data: Hazard.all.order(created_at: 'asc')
      },
      status: 200
    )
  end
end
