Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get 'dashboard', to: 'pages#dashboard', as: :dashboard
  get 'videocall', to: 'calls#videocall'
  resources :forums do
    resources :posts, only: %i[index new create]
  end
  resources :posts, except: %i[index new create]
  resources :calls
  resources :journals
end
