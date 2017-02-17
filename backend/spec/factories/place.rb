FactoryGirl.define do
  factory :place do
    name { Faker::Friends.location }
    latitude { Faker::Address.latitude }
    longitude { Faker::Address.longitude }
    address { Faker::Address.street_address }
  end
end
