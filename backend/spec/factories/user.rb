FactoryGirl.define do
  factory :user do
    provider 'email'
    email { Faker::Internet.email }
    uid { email }

    factory :confirmed_user do
      confirmed_at 2.weeks.ago
    end
  end
end
