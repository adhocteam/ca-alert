class AdminMailer < ApplicationMailer
  def announce_new_admin_role(user)
    @user = user
    mail(to: @user.email, subject: 'You are now an admin on CAlerts!')
  end
end
