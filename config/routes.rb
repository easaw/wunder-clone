Rails.application.routes.draw do
  root to: "site#root"
  
  resource :session, only: [:create, :new, :destroy]
  resources :users
  
  namespace :api, defaults: { format: :json } do
    resources :lists, only: [:create, :show, :index, :destroy, :update] do
      resources :tasks, only: [:index]
    end
  
    resources :tasks, only: [:create, :destroy, :show, :update]
  end
end
