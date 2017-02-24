# README

## Configuring the app locally

### Ruby version

The app was built against Ruby 2.3.3.

### Installing gems

Install bundler with `gem install bundler`.
Run `bundle install` to download and install the appropriate gems.

### Setting up the environment

This app uses detenv to set the environment for the app. There is a sample environment file in .env-sample, so you'll need
to copy that file to .env: `cp .env-sample .env` before running the app.

### Database information

The app was built against PostgreSQL 9.6 but should also run with earlier versions. Create the databases locally with:

```ruby
createdb ca-alert_development
createdb ca-alert_test
```

To handle the geographic data you will also need to install PostGIS. On a Mac, this can be done with `brew install postgis`. Further
instructions are provided [here](http://postgis.net/install/).

Then initialize the schema with:

```
rake db:schema:load
rake db:migrate
```

### Running the test suite

`rake` will run the test suite along with checking for Rubocop offenses. The app uses rspec for testing.

### Twilio access for SMS delivery

If you'd like to deliver SMS messages locally, you'll need to configure the Twilio values in the .env file. It requires
you to provide an account SID and an auth token.

## API Documentation

The API is documented with Swagger. When running the app locally, add `http://localhost:3000/apidocs` to Swagger UI
to view the documentation. To see the documentation running in production, add `https://ca-alert.herokuapp.com/apidocs`.
