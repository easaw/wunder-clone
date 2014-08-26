class ListShare < ActiveRecord::Base
  validates :list_id, :user_id, :status, presence: true
  
  belongs_to(
  :list,
  class_name: "List",
  foreign_key: :list_id,
  primary_key: :id
  )
  
  belongs_to(
  :user,
  class_name: "User",
  foreign_key: :user_id,
  primary_key: :id
  )
end
