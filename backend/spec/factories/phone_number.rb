FactoryGirl.define do
  factory :phone_number do
    phone_number { Faker::PhoneNumber.phone_number }
    verified false
  end
end
