Rails.application.routes.draw do
  devise_for :users
  root to: "pages#home"
  get 'dashboard', to: 'pages#dashboard', as: :dashboard
  resources :subforums do
    resources :posts, only: %i[show new create edit update destroy] do
      resources :comments, only: %i[create destroy]
    end
  end
  resources :calls
  resources :journals

  get 'subforums/posts', to: 'posts#all_posts', as: 'all_subforum_posts'
end
