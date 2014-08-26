class List < ActiveRecord::Base
  validates :owner_id, :name, presence: true
  
  belongs_to(
  :owner,
  class_name: "User",
  foreign_key: :owner_id,
  primary_key: :id
  )
  
  has_many(
  :tasks,
  class_name: "Task",
  foreign_key: :list_id,
  primary_key: :id
  )
end
