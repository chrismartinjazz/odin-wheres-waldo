class Api::V1::ScoresController < ApplicationController
  def create
    image = Image.find(params[:id])
    if image
      score = image.scores.create!(score_params)
      if score
        render json: { id: score.id }, status: :created
      else
        render json: score.errors, status: :unprocessable_entity
      end
    else
      render json: image.errors
    end
  end

  def update
    score = Score.find(params[:id])
    if score
      elapsed_time = Time.now() - score[:created_at]
      score.update(time: elapsed_time)
      render json: { score: score }
    else
      render json: score.errors, status: :unprocessable_entity
    end
  end

  private

  def score_params
    params.permit(:image_id, :name, :time)
  end

end
