class AddDefaultToScores < ActiveRecord::Migration[7.1]
  def change
    change_column_default :scores, :name, from: nil, to: "Anonymous"
  end
end
