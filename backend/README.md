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

The app was built against PostgreSQL 9.6, but should work with any 9.x version. Create the databases locally with:

``` shell
$ createdb ca-alert_{development,test}
```

To handle the geographic data you will also need to install PostGIS. On a Mac, this can be done with `brew install postgis`. Further
instructions are provided [here](http://postgis.net/install/).

Then initialize the schema with:

``` shell
$ rake db:schema:load
$ rake db:migrate
```

### Running the test suite

`rake` will run the test suite along with checking for Rubocop offenses. The app uses rspec for testing.

### Receiving email when running locally

In development, the app uses [Mailcatcher](https://mailcatcher.me/) to allow reading and interacting with emails. In order to get this running you'll need to install the gem with `gem install mailcatcher` and then run the daemon with `mailcatcher`. After doing so, you can open your browser to [http://localhost:1080](http://localhost:1080) to use the mail client for reading emails. You'll want to have this up and running before creating your account in order to receive the verification email.

### Twilio configuration for SMS delivery

If you'd like to deliver SMS messages locally, you'll need to configure the Twilio values in the .env file. It requires
you to provide an account SID and an auth token. [Here are instructions for getting these values from Twilio](https://support.twilio.com/hc/en-us/articles/223136027-Auth-Tokens-and-how-to-change-them). If these values aren't provided, no SMS messages will be sent, but the Rails log will contain information about the messages that would have been delivered.

To protect from spamming people, the app will not send SMS messages to any phone number beginning with 555, 1-555, or (555). These types of numbers are used when seeding the database with fake data.

## API Documentation

The API is documented with Swagger. When running the app locally, add `http://localhost:3000/apidocs` to Swagger UI
to view the documentation. To see the documentation running in production, add `https://ca-alert.herokuapp.com/apidocs`.

## Testing on the command line

The API can be fully driven on the command like through curl. In the commands listed below, replace things in `{}` with the appropriate values for your setup.

### Creating an account

``` shell
$ curl -XPOST -v https://{DOMAIN}/auth --data "email={YOUR_EMAIL}&password={YOUR_PASSWORD}&password_confirmation={YOUR_PASSWORD}"
```

### Logging into your account

Sign into the account with:

``` shell
$ curl -XPOST -v https://{DOMAIN}/auth/sign_in --data "email={YOUR_EMAIL}&password={YOUR_PASSWORD}"`
```

In the response to this request, take note of the Access-token and Client headers:

```
Access-Token: tVoCE_TW5t5RT9McO4WD-g
Client: 75PZvDZdsfsdLOKq4HHAnUTw
```

### Making requests using your account

Using the responses from the headers above, you can make authenticated requests like this:

```
$ curl -X{REQUST_METHOD} -v https://{DOMAIN}/{ENDPOINT} --header "uid: {YOUR_EMAIL}" --header "access-token: {YOUR_ACCESS_TOKEN_FROM_LOGIN_HEADERS}" --header "client: {YOUR_CLIENT_FROM_LOGIN_HEADERS}"`
```
