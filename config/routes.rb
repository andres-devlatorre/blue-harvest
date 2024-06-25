Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get 'dashboard', to: 'pages#dashboard', as: :dashboard
  resources :subforums do
    resources :posts do
      resources :comments, only: %i[create destroy]
    end
  end
  resources :posts, except: %i[index new create]
  resources :calls
  resources :journals
end
