class WordsController < ApplicationController
  def index
    count = 10
    count = params[:count].to_i if params[:count]
    words = Word.limit(count)
    render json: words, only: [:id, :text, :count]
  end
end
