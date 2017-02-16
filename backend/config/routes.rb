Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  get '/ping', to: "ping#show", as: :ping

  resources :apidocs, only: [:index]
end
