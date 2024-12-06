Rails.application.routes.draw do
  namespace :admin do
    get 'itineraries/show'
  end
  namespace :admin do
    get 'users/index'
    get 'users/show'
    get 'users/edit'
  end
  namespace :admin do
    get 'admins/show'
    get 'admins/edit'
  end
  namespace :public do
    get 'favorites/index'
  end
  namespace :public do
    get 'itineraries/new'
    get 'itineraries/index'
    get 'itineraries/show'
    get 'itineraries/edit'
  end
  namespace :public do
    get 'my/index'
  end
  get 'users/edit'
  get 'users/show'
  get 'users/update'
  get 'users/index'
  namespace :public do
    get 'homes/top'
  end
  devise_for :admins
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
