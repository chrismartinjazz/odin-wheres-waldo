Rails.application.routes.draw do
  # namespace :api do
  #   namespace :v1 do
  #   end
  # end
  root 'homepage#index'
  get '/image' => 'homepage#index'
  get '/#path' => 'homepage#index'
  get "up" => "rails/health#show", as: :rails_health_check
end
