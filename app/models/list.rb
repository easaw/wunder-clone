class List < ActiveRecord::Base
  validates :owner_id, :name, presence: true
  
  belongs_to(
  :owner,
  inverse_of: :owned_lists,
  class_name: "User",
  foreign_key: :owner_id,
  primary_key: :id
  )
  
  has_many(
  :tasks,
  dependent: :destroy,
  class_name: "Task",
  foreign_key: :list_id,
  primary_key: :id
  )
  
  has_many(
  :list_shares,
  inverse_of: :list,
  dependent: :destroy,
  class_name: "ListShare",
  foreign_key: :list_id,
  primary_key: :id
  )
  
  has_many(
  :shared_users,
  through: :list_shares,
  source: :user
  )

  def active_tasks
    self.tasks.where(completed: false)
  end
  
  def completed_tasks
    self.tasks.where(completed: true)
  end
  
end
