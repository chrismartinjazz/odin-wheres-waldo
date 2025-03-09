class Element < ApplicationRecord
  belongs_to :image
  validates :name, presence: true
  validates :x1, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :y1, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :x2, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
  validates :y2, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }
end
