Rails.application.routes.draw do
  root to: "site#root"
  get 'landing',  to: "site#landing", as: :landing
  
  get "/auth/:provider/callback" => "sessions#oauth"
  
  resource :session, only: [:create, :new, :destroy]
  resources :users
  
  namespace :api, defaults: { format: :json } do
    resources :lists, only: [:create, :show, :index, :destroy, :update]
    
    resources :tasks, only: [:create, :show, :index, :destroy, :update]
    
    resources :list_shares, only: [:create, :destroy]
    
    resources :notifications, only: [:index, :update]
    
    resources :users, only: [:index]
  end
end
