Rails.application.routes.draw do
  root to: 'lists#index'
  resource :session, only: [:create, :new, :destroy]
  resources :users
  
  resources :lists
end
