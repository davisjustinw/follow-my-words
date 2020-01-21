class BooksController < ApplicationController
  def index
    book = Book.all
    render json: book, only: [:title, :author]
  end
end
