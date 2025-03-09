raise 'You are in production environment - do not re-seed database' if Rails.env.production?

# ============= IMAGES ==================

Image.destroy_all

images = [
  {
    src: "/images/ww-1-1.jpeg", title: "Where's Waldo - Book 1, Scene 1", width: 2040, height: 1260
  }
]

images.each do |image|
  Image.create!(src: image[:src], title: image[:title], width: image[:width], height: image[:height])
end

Rails.logger.info "Created #{Image.count} images"

# ============== ELEMENTS ==============

Element.destroy_all

elements = [
  # Where's Waldo - Book 1 Scene 1
  [
    {
      name: "Waldo",
      x1: 858,
      y1: 925,
      x2: 922,
      y2: 1029,
    },
    {
      name: "Woof",
      x1: 1160,
      y1: 388,
      x2: 1182,
      y2: 402,
    },
    {
      name: "Wenda",
      x1: 878,
      y1: 746,
      x2: 906,
      y2: 793,
    },
    {
      name: "Wizard Whitebeard",
      x1: 1327,
      y1: 955,
      x2: 1376,
      y2: 999,
    },
    {
      name: "Odlaw",
      x1: 1174,
      y1: 1190,
      x2: 1217,
      y2: 1236,
    },
  ]
]

images = Image.all

images.each_with_index do |image, index|
  imageElements = elements[index]
  imageElements.each do |imageElement|
    image.elements.create!(
      name: imageElement[:name],
      x1: imageElement[:x1],
      y1: imageElement[:y1],
      x2: imageElement[:x2],
      y2: imageElement[:y2]
    )
  end
end

Rails.logger.info "Created #{Element.count} elements"
