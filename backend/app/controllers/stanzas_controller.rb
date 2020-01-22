class StanzasController < ApplicationController
  def index
    stanzas = Stanza.all
    render json: stanzas, only: [:id], include: [:lines]
  end

  def show
    stanza = Stanza.find_by_id params[:id]
    render json: stanza, include: [:lines]
  end

  def create
    new_stanza = Stanza.create stanza_params
    render json: new_stanza, include: [:lines]
  end

  private
  def stanza_params
    params.require(:stanza).permit(lines_attributes: [  :id, :text ])
  end
end
