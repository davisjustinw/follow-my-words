class BooksController < ApplicationController
  def index
    book = Book.all
    render json: Books, only: [:title, :author]
  end
end
