class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.integer :list_id, null: false
      t.string :name, null: false
      t.boolean :star
      t.date :due_date
      t.date :remind_date
      
      
      t.timestamps
    end
    
    add_index :tasks, :list_id
  end
end
