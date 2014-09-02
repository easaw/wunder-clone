class RemoveStatusColumnRestraint < ActiveRecord::Migration
  def change
    remove_column :list_shares, :status
    add_column :list_shares, :status, :string
  end
end
