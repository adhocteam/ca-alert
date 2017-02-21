class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

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
end
