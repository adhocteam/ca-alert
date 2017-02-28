class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  before_action :configure_permitted_parameters, if: :devise_controller?

  def require_admin
    if !current_user&.has_role?(:admin)
      render(
        json: {
          status: 'error',
          errors: ['Unauthorized']
        },
        status: 401
      )
    end
  end

  private

  def not_found
    render(
      json: {
        status: 'error',
        errors: ['Record not found']
      },
      status: 404
    )
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:account_update, keys: [:email_notifications_enabled])
  end
end
