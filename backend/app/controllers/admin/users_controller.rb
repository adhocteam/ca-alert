class Admin::UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def search
    render(
      json: {
        status: 'success',
        data: User.search(query: params[:q])
      },
      status: 200
    )
  end
end
