class CreateElements < ActiveRecord::Migration[7.1]
  def change
    create_table :images do |t|
      t.text :title, null: false
      t.text :src, null: false
      t.integer :width, null: false
      t.integer :height, null: false
      t.timestamps
    end

    create_table :elements do |t|
      t.belongs_to :image, index: true, foreign_key: true
      t.text :name, null: false
      t.integer :x1, null: false
      t.integer :y1, null: false
      t.integer :x2, null: false
      t.integer :y2, null: false
      t.timestamps
    end

    create_table :scores do |t|
      t.belongs_to :image, index: true, foreign_key: true
      t.text :name
      t.decimal :time, null: false
      t.timestamps
    end
  end
end
