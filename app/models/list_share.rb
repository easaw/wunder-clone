class ListShare < ActiveRecord::Base
  validates :list, :user_id, presence: true
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
  
  has_many :notifications, as: :notifiable, inverse_of: :notifiable
  after_commit :set_notification, on: [:create]
  before_destroy :set_destroy_notification
  
  after_initialize :init
  
  def init
    # self.status = "Pending"
  end
  
  private

  def set_notification
    notification = self.notifications.unread.event(:new_shared_list).new
    notification.user = self.user
    notification.save
  end
  
  def set_destroy_notification
    notification = self.notifications.unread.event(:destroy_shared_list).new
    notification.user = self.user
    notification.save
  end
  
end
