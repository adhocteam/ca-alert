if ENV['TWILIO_ACCOUNT_SID'].present? && ENV['TWILIO_AUTH_TOKEN'].present?
  Twilio.configure do |config|
    config.account_sid = ENV['TWILIO_ACCOUNT_SID']
    config.auth_token = ENV['TWILIO_AUTH_TOKEN']
  end
  TWILIO_CLIENT = Twilio::REST::Client.new
else
  require 'fake_twilio'
  TWILIO_CLIENT = FakeTwilio.new
end
