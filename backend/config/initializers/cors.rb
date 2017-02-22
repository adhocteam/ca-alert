# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'

    resource(
      '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      # We need to explicitly expose non-standard CORS response headers via
      # Access-Control-Expose-Headers in order for client code to get access to
      # them, these are from devise token auth
      expose: ['access-token', 'client', 'expiry', 'token-type', 'uid']
    )
  end
end
