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

  def make_admin
    user = User.find(params[:id])
    user.add_role(:admin)
    render(
      json: {
        status: 'success'
      },
      status: 200
    )
  end

  def resend_admin_email
    user = User.find(params[:id])
    AdminMailer.announce_new_admin_role(user).deliver_now
    render(
      json: {
        status: 'success'
      },
      status: 200
    )
  end
end
