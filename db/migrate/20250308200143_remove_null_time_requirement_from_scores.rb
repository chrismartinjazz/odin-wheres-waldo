class RemoveNullTimeRequirementFromScores < ActiveRecord::Migration[7.1]
  def change
    change_column_null :scores, :time, true
  end
end
