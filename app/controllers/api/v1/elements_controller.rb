class Api::V1::ElementsController < ApplicationController
  def check_coordinates
    element = Element.find(params[:id])

    if element && inside_bounding_box?(element, params[:x].to_f, params[:y].to_f)
      render json: { found: true }
    else
      render json: { found: false }
    end
  end

  private

  def inside_bounding_box?(element, x, y)
    x >= element.x1 && x <= element.x2 && y >= element.y1 && y <= element.y2
  end
end
