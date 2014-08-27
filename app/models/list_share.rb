class ListShare < ActiveRecord::Base
  validates :list, :user_id, :status, presence: true
  validates :list_id, uniqueness: { scope: :user_id,
    message: "can't share list with the same user twice" }
  
  belongs_to(
    :list,
    inverse_of: :list_shares,
    class_name: "List",
    foreign_key: :list_id,
    primary_key: :id
  )
  
  belongs_to(
    :user,
    inverse_of: :list_shares,
    class_name: "User",
    foreign_key: :user_id,
    primary_key: :id
  )
  
  after_initialize :init
  
  def init
    self.status = "Pending"
  end
end
