class ChangeLatLngToStrings < ActiveRecord::Migration
  def change
    remove_column :tasks, :lat
    remove_column :tasks, :lng
    add_column :tasks, :lat, :string
    add_column :tasks, :lng, :string
  end
end
