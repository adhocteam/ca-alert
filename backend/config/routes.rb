Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  get '/ping', to: 'ping#show', as: :ping

  resources :alerts, only: [:index]
  resources :apidocs, only: [:index]
  resources :phone_numbers, only: [:create, :destroy] do
    member do
      patch :verify, as: :verify
    end
  end
  resources :places, only: [:index, :create, :update, :destroy]

  namespace :admin do
    resources :users, only: [] do
      collection do
        get :search, as: :search
      end
      member do
        patch :make_admin, as: :make_admin
      end
    end
    resources :hazards, only: [:create]
  end
end
