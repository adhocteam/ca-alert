class PlacesController < ApplicationController
  before_action :authenticate_user!
  before_action :load_place, only: [:update, :destroy]

  def index
    render(
      json: {
        status: 'success',
        data: current_user.places
      },
      status: 200
    )
  end

  def create
    place = current_user.places.new(place_params)
    if place.save
      render(
        json: {
          status: 'success',
          data: place
        },
        status: 200
      )
    else
      render(
        json: {
          status: 'error',
          errors: place.errors
        },
        status: 400
      )
    end
  end

  def update
    if @place.update_attributes(place_params)
      render(
        json: {
          status: 'success',
          data: @place
        },
        status: 200
      )
    else
      render(
        json: {
          status: 'error',
          errors: @place.errors
        },
        status: 400
      )
    end
  end

  def destroy
    @place.destroy
    render(
      json: {
        status: 'success'
      },
      status: 200
    )
  end

  private

  def place_params
    params.permit(:name, :address, :latitude, :longitude)
  end

  def load_place
    @place = current_user.places.find(params[:id])
  end
end
