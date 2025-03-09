class Api::V1::ImagesController < ApplicationController
  def index
    image = Image.all.order(created_at: :desc)
    render json: image
  end

  def show
    image = Image.find(params[:id])

    render json: image.as_json.merge(
      elements: image.elements.map{ |element| { id: element.id, name: element.name } }
    )
  end

  private

  def image_params
    params.permit(:src, :title, :width, :height)
  end
end
