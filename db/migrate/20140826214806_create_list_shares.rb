class CreateListShares < ActiveRecord::Migration
  def change
    create_table :list_shares do |t|
      t.integer :list_id, null: false
      t.integer :user_id, null: false
      t.string :status, null: false

      t.timestamps
    end
    
    add_index :list_shares, [:list_id, :user_id], unique: true
  end
end
