require 'faker'

namespace :seed_db do
  desc 'Load a bunch of data into the database'
  task load_data: :environment do
    # Seed the database with some value so we get consistent results
    srand(10)

    Faker::Config.locale = 'en-US'
    # rubocop:disable Metrics/LineLength, Style/SpaceAfterComma
    bboxes = {
      la: { users: 200, hazards: 10, bbox: [[-118.3416763544,33.7545696297],[-116.8536361456,33.7545696297],[-116.8536361456,34.5128130796],[-118.3416763544,34.5128130796],[-118.3416763544,33.7545696297]] },
      bay_area: { users: 120, hazards: 20, bbox: [[-122.52746737,37.2242829159],[-121.0394271612,37.2242829159],[-121.0394271612,37.9501847848],[-122.52746737,37.9501847848],[-122.52746737,37.2242829159]] },
      sacramento: { users: 40, hazards: 2, bbox: [[-122.2198501825,38.3357009497],[-120.7318099737,38.3357009497],[-120.7318099737,39.0506825529],[-122.2198501825,39.0506825529],[-122.2198501825,38.3357009497]] },
      midstate: { users: 20, hazards: 1, bbox: [[-120.8982852995,35.3158175141],[-119.1090389192,35.3158175141],[-119.1090389192,37.9110311894],[-120.8982852995,37.9110311894],[-120.8982852995,35.3158175141]] },
      southstate: { users: 50, hazards: 4, bbox: [[-117.3826602995,33.1267615938],[-115.5934139192,33.1267615938],[-115.5934139192,35.7926224763],[-117.3826602995,35.7926224763],[-117.3826602995,33.1267615938]] },
      ncal: { users: 10, hazards: 1, bbox: [[-124.0795898437,38.2122880544],[-120.0146484375,38.2122880544],[-120.0146484375,41.9431487473],[-124.0795898437,41.9431487473],[-124.0795898437,38.2122880544]] }
    }
    # rubocop:enable Metrics/LineLength, Style/SpaceAfterComma

    users_created = 0
    places_created = 0
    hazards_created = 0
    before_alert_count = Alert.count

    #
    # Create a bunch of user accounts in the boxes first. Each user will have a few places and one phone number.
    #
    bboxes.each do |place_name, data|
      puts "#{place_name} users"
      mins = [data[:bbox].map { |i| i[0] }.min, data[:bbox].map { |i| i[1] }.min]
      maxes = [data[:bbox].map { |i| i[0] }.max, data[:bbox].map { |i| i[1] }.max]
      deltas = [maxes[0] - mins[0], maxes[1] - mins[1]]

      data[:users].times do
        password = Faker::Internet.password
        email = Faker::Internet.safe_email
        email = Faker::Internet.safe_email while User.where(email: email).any?
        creation = Faker::Time.between(2.months.ago, Date.today)
        user = User.create!(
          provider: 'email',
          email: email,
          password: password,
          password_confirmation: password,
          uid: email,
          confirmed_at: creation,
          created_at: creation,
          email_notifications_enabled: false
        )
        users_created += 1
        user.phone_numbers.create!(
          phone_number: "555-555-#{Faker::PhoneNumber.subscriber_number}",
          notifications_enabled: false
        )
        (rand(3) + 1).times do
          pos = [mins[0] + (rand * deltas[0]), mins[1] + (rand * deltas[1])]
          user.places.create!(
            name: Faker::Friends.location,
            latitude: pos[1],
            longitude: pos[0],
            address: Faker::Address.street_address,
            created_at: creation
          )
          places_created += 1
        end
      end
    end

    bboxes.each do |place_name, data|
      puts "#{place_name} hazards"

      mins = [data[:bbox].map { |i| i[0] }.min, data[:bbox].map { |i| i[1] }.min]
      maxes = [data[:bbox].map { |i| i[0] }.max, data[:bbox].map { |i| i[1] }.max]
      deltas = [maxes[0] - mins[0], maxes[1] - mins[1]]

      data[:hazards].times do
        pos = [mins[0] + (rand * deltas[0]), mins[1] + (rand * deltas[1])]
        creation = Faker::Time.between(2.months.ago, Date.today)
        Hazard.create!(
          title: Faker::Friends.location,
          message: Faker::Lorem.paragraph,
          latitude: pos[1],
          longitude: pos[0],
          radius_in_meters: rand(50_000) + 5000,
          address: Faker::Address.street_address,
          link: Faker::Internet.url,
          phone_number: "555-555-#{Faker::PhoneNumber.subscriber_number}",
          created_at: creation
        )
        hazards_created += 1
      end
    end

    puts 'CREATED:'
    puts "  #{users_created} users"
    puts "  #{places_created} places"
    puts "  #{hazards_created} hazards"
    puts "  #{Alert.count - before_alert_count} alerts"
  end
end
