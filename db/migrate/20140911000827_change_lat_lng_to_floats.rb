class ChangeLatLngToFloats < ActiveRecord::Migration
  def change
    remove_column :tasks, :lat
    remove_column :tasks, :lng
    add_column :tasks, :lat, :float
    add_column :tasks, :lng, :float
  end
end
