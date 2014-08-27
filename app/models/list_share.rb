class ListShare < ActiveRecord::Base
  validates :list_id, :user_id, :status, presence: true
  validates :list_id, uniqueness: { scope: :user_id,
    message: "can't share list with the same user twice" }
  
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
