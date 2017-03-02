class HazardNotificationMailer < ApplicationMailer
  def alert_user(alert)
    @alert = alert
    mail(to: @alert.place.user.email, subject: "New #{alert.hazard.is_emergency? ? 'EMERGENCY ' : ''}Alert From CAlerts!")
  end
end
