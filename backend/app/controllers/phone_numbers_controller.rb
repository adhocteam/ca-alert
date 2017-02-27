class PhoneNumbersController < ApplicationController
  before_action :authenticate_user!
  before_action :load_phone_number, only: [:update, :destroy, :verify]

  def index
    render(
      json: {
        status: 'success',
        data: current_user.phone_numbers
      },
      status: 200
    )
  end

  def create
    pn = current_user.phone_numbers.new(phone_number_params)
    if pn.save
      render(
        json: {
          status: 'success',
          data: pn
        },
        status: 200
      )
    else
      render(
        json: {
          status: 'error',
          errors: pn.errors
        },
        status: 400
      )
    end
  end

  def update
    if @phone_number.update_attributes(phone_number_params)
      render(
        json: {
          status: 'success',
          data: @phone_number
        },
        status: 200
      )
    else
      render(
        json: {
          status: 'error',
          errors: @phone_number.errors
        },
        status: 400
      )
    end
  end

  def destroy
    @phone_number.destroy
    render(
      json: {
        status: 'success'
      },
      status: 200
    )
  end

  def verify
    if @phone_number.pin == params[:pin]
      @phone_number.update_attribute(:verified, true)
      render(
        json: {
          status: 'success',
          data: @phone_number
        },
        status: 200
      )
    else
      @phone_number.update_attribute(:pin_attempts, @phone_number.pin_attempts + 1)
      render(
        json: {
          status: 'error',
          errors: ['Incorrect pin']
        },
        status: 400
      )
    end
  end

  private

  def phone_number_params
    params.permit(:phone_number, :notifications_enabled)
  end

  def load_phone_number
    @phone_number = current_user.phone_numbers.find(params[:id])
  end
end
