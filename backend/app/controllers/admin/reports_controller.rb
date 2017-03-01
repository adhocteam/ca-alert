class Admin::ReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :require_admin

  def alerts
    dated_count_report(Alert)
  end

  def users
    dated_count_report(User)
  end

  def communication_methods
    user_count = User.where(email_notifications_enabled: true).count
    phone_count = PhoneNumber.where(notifications_enabled: true).count
    render(
      json: {
        status: 'success',
        data: {
          emails: user_count,
          phone_numbers: phone_count
        }
      },
      status: 200
    )
  end

  private

  def dated_count_report(klass)
    days_back = params[:days_back]&.to_i || 30
    date = Date.current - days_back
    all_instances = klass.where('created_at >= ?', date).to_a
    result = {}
    while date <= Date.current
      result[date] = all_instances.select { |a| a.created_at >= date.to_time && a.created_at < (date + 1).to_time }.count
      date += 1
    end
    render(
      json: {
        status: 'success',
        data: result
      },
      status: 200
    )
  end
end
