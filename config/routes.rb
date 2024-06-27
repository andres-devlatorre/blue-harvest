Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get 'dashboard', to: 'pages#dashboard', as: :dashboard
  resources :forums do
    resources :posts, only: %i[index new create]
  end
  resources :posts, except: %i[index new create]
  resources :calls
  resources :journals
  resources :users do
    member do
      patch :online_status
    end
  end

  resources :livechats, only: %i[index show create update destroy] do
    resources :messages, only: %i[index create]
  end
end
