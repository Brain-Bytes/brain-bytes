Rails.application.routes.draw do
  namespace :admin do
      resources :users
      resources :bytes
      resources :tags

      root to: "users#index"
    end
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: 'graphql#execute' if Rails.env.development?
  post '/graphql', to: 'graphql#execute'

  root to: "pages#home"
  get '*path', to: 'pages#home', via: :all

  namespace :api, defaults: { format: :json } do
    resources :users, only: %w[show]
  end

  devise_for :users,
             defaults: { format: :json },
             path: '',
             path_names: {
               sign_in: 'api/login',
               sign_out: 'api/logout',
               registration: 'api/signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }
  get '/member-data', to: 'members#show'
end
