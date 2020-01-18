class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.string :text
      t.integer :syllable_count
      t.integer :count, default: 1
      t.integer :book_id
      t.timestamps
    end
  end
end
