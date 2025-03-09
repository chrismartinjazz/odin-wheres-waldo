class Image < ApplicationRecord
  has_many :elements, dependent: :destroy
  has_many :scores, dependent: :destroy
  validates :src, presence: true
  validates :title, presence: true
  validates :width, presence: true
  validates :height, presence: true
end

# image = Image.create(src: "/images/ww-1-1.jpeg", title: "Where's Waldo - Book 1, Scene 1", width: 2040, height: 1260)
# element = image.elements.create(name: "Waldo", x1: 858, y1: 925, x2: 922, y2: 1029)
