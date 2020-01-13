class WordsController < ApplicationController
  def index
    words = Word.all
    render json: words, only: [:id, :text, :count]
  end
end
