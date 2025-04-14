Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'images/index'
      get 'show/:id', to: 'images#show'
      post 'elements/check', to: 'elements#check_coordinates'
      resources :scores, only: [:create, :update]
    end
  end
  root 'homepage#index'
  get '*path', to: 'homepage#index', constraints: ->(req) { !req.xhr? && req.format.html? }

  get "up" => "rails/health#show", as: :rails_health_check
end
