class CreateLines < ActiveRecord::Migration[6.0]
  def change
    create_table :lines do |t|
      t.integer :stanza_id
      t.string :text
      t.timestamps
    end
  end
end
