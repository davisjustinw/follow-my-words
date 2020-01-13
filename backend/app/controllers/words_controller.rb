class WordsController < ApplicationController
  def index
    limit = 10
    limit = params[:limit].to_i if params[:limit]
    words = Word.limit(limit)
    render json: words, only: [:id, :text, :count]
  end
end
