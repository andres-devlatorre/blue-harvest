Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get 'dashboard', to: 'pages#dashboard', as: :dashboard
  
  resources :subforums do
    resources :posts, only: %i[show new create edit update destroy] do
      resources :comments, only: %i[create destroy]
    end
  get 'videocall', to: 'calls#videocall'

  end
  resources :calls
  resources :journals

  resources :users, only: %i[show]
  patch '/users/:id/online_status', to: 'users#online_status', as: :update_online_status

  resources :livechats, only: %i[index show create update destroy] do
    resources :messages, only: %i[index create]
  end
  get 'subforums/posts', to: 'posts#all_posts', as: 'all_subforum_posts'
end
