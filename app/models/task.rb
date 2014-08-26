class Task < ActiveRecord::Base
  validates :list_id, :name, presence: true
  
  belongs_to(
  :list,
  class_name: "List",
  foreign_key: :list_id,
  primary_key: :id
  )
end
