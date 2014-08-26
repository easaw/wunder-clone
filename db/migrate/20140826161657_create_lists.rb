class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.integer :owner_id, null: false
      t.string :name, null: false

      t.timestamps
    end
    
    add_index :lists, :owner_id
  end
end
