class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  rescue_from ActiveRecord::RecordNotFound, with: :not_found

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
