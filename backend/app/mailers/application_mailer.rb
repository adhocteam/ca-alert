class ApplicationMailer < ActionMailer::Base
  default from: 'donotreply@calerts.org'
  layout 'mailer'
end
