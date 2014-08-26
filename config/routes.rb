Rails.application.routes.draw do
  root to: 'lists#index'
  resources :users
  resource :session, only: [:create, :new]
end
