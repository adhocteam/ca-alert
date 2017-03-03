class Admin::HazardsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def index
    render(
      json: {
        status: 'success',
        data: Hazard.all.order(created_at: 'asc').limit(50)
      },
      status: 200
    )
  end

  def show
    render(
      json: {
        status: 'success',
        data: Hazard.find(params[:id])
      },
      status: 200
    )
  end

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
    params.permit(
      :title, :message, :longitude, :latitude, :radius_in_meters,
      :address, :link, :phone_number, :category, :link_title, :is_emergency
    )
  end
end
