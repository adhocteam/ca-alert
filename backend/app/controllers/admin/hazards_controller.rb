class Admin::HazardsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def create
    hazard = Hazard.new(hazard_params)
    hazard.creator_id = current_user.id
    if hazard.save
      render(
        json: {
          status: 'success',
          data: hazard
        },
        status: 200
      )
    else
      render(
        json: {
          status: 'error',
          errors: hazard.errors
        },
        status: 400
      )
    end
  end

  protected

  def hazard_params
    params.permit(:title, :message, :longitude, :latitude, :radius_in_meters, :address, :link, :phone_number)
  end
end
