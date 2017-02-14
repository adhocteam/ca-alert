# README

## Configuring the app locally

### Ruby version

The app was built against Ruby 2.4.

### Installing gems

Run `bundle install` to download and install the appropriate gems.

### Database information

The app was built against PostgreSQL 9.6 but should also run with earlier versions. Create the databases locally with:

```ruby
createdb ca-alert_development
createdb ca-alert_test
```

Then run migrations to initialize the schema with `rake db:migrate`.

### Running the test suite

`rake` will run the test suite along with checking for Rubocop offenses. The app uses rspec for testing.
