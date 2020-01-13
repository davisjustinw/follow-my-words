class CreateWords < ActiveRecord::Migration[6.0]
  def change
    create_table :words do |t|
      t.string :text
      t.string :count

      t.timestamps
    end
  end
end
