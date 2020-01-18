class WordsController < ApplicationController
  def index
    #limit = 10
    #limit = params[:limit].to_i if params[:limit]
    #words = Word.limit(limit)
    words = Word.all
    render json: words, only: [:id, :text, :count]
  end
end
