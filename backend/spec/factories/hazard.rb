FactoryGirl.define do
  factory :hazard do
    title { Faker::Friends.location }
    message { Faker::Lorem.paragraph }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    radius_in_meters { Faker::Number.decimal(2) }
    address { Faker::Address.street_address }
    link { Faker::Internet.url }
    phone_number { Faker::PhoneNumber.phone_number }
  end
end
