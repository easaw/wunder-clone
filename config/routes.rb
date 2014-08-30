Rails.application.routes.draw do
  root to: "site#root"
  landing to: "site#landing"
  
  resource :session, only: [:create, :new, :destroy]
  resources :users
  
  namespace :api, defaults: { format: :json } do
    resources :lists, only: [:create, :show, :index, :destroy, :update]
    
    resources :tasks, only: [:create, :show, :index, :destroy, :update]
  end
end
