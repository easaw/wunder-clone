Rails.application.routes.draw do
  root to: 'lists#index'
  resource :session, only: [:create, :new]
  resources :users
  
  resources :lists
end
