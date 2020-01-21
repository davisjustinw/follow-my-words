Rails.application.routes.draw do
  resources :books do
    resources :words
  end

  resources :stanzas do
    resources :lines
  end
end
