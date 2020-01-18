Rails.application.routes.draw do
  resources :books do
    resources :words
  end
end
