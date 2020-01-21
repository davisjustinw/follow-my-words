class CreateStanzas < ActiveRecord::Migration[6.0]
  def change
    create_table :stanzas do |t|

      t.timestamps
    end
  end
end
