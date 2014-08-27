class Task < ActiveRecord::Base
  validates :list_id, :name, presence: true
  
  belongs_to(
  :list,
  class_name: "List",
  foreign_key: :list_id,
  primary_key: :id
  )
  
  after_initialize :init
  
  def init
    self.completed ||= false
    self.starred ||= false
  end
  
end
