Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  get '/ping', to: 'ping#show', as: :ping

  resources :apidocs, only: [:index]
  resources :places, only: [:index, :create, :update, :destroy]

  namespace :admin do
    get '/users/search', to: 'users#search', as: :user_search
  end
end
