Rails.application.routes.draw do
  get '/ping', to: "ping#show", as: :ping

  resources :apidocs, only: [:index]
end
