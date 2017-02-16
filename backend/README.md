# README

## Configuring the app locally

### Ruby version

The app was built against Ruby 2.3.3.

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

## API Documentation

The API is documented with Swagger. When running the app locally, add `http://localhost:3000/apidocs` to Swagger UI
to view the documentation. To see the documentation running in production, add `https://ca-alert.herokuapp.com/apidocs`.
