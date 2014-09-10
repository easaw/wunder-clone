class AddLatLngToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :lat, :integer
    add_column :tasks, :lng, :integer
  end
end
