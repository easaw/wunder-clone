class AddNotificationsCountToListShares < ActiveRecord::Migration
  def change
    add_column :list_shares, :notifications_count, :integer
    add_column :lists, :notifications_count, :integer
    add_column :tasks, :notifications_count, :integer
  end
end
