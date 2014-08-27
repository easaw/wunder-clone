class ChangeStarToStarred < ActiveRecord::Migration
  def change
    remove_column :tasks, :star
    add_column :tasks, :starred, :boolean
  end
end
