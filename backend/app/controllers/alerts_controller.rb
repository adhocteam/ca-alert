class AlertsController < ApplicationController
  before_action :authenticate_user!

  def index
    render(
      json: {
        status: 'success',
        data: current_user.alerts
      },
      status: 200
    )
  end
end
