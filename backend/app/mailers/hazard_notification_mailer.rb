class HazardNotificationMailer < ApplicationMailer
  def alert_user(alert)
    @alert = alert
    mail(to: @alert.place.user.email, subject: 'New Alert From CAlerts!')
  end
end
