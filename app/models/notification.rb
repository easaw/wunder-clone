class Notification < ActiveRecord::Base
  include Rails.application.routes.url_helpers

  EVENTS = {
    1 => :new_shared_list,
    2 => :destroy_shared_list
  }

  EVENT_IDS = EVENTS.invert

  belongs_to :user, inverse_of: :notifications, counter_cache: true
  belongs_to :notifiable, inverse_of: :notifications, polymorphic: true, counter_cache: true

  validates :event_id, inclusion: { in: EVENTS.keys }
  validates :is_read, inclusion: { in: [true, false] }
  validates :notifiable, :user, presence: true

  scope :read, -> { where(is_read: true) }
  scope :unread, -> { where(is_read: false) }
  scope :event, ->(event_name) { where(event_id: EVENT_IDS[event_name]) }

  def url
    case self.event_name
    when :new_shared_list
      list_share = self.notifiable
      list = list_share.list
      return "#{list.id}"
    when :destroy_shared_list
      return "#"
    end
  end

  def text
    case self.event_name
    when :new_shared_list
      list_share = self.notifiable
      list = list_share.list
      list_owner = list.owner
      
      "#{list_owner.name} shared their list, #{list.name}, with you!"
    when :destroy_shared_list
      list_share = self.notifiable
      list = list_share.list
      list_owner = list.owner
      
      "#{list_owner.name} deleted their shared list, #{list.name}!"
      return "#"
    end
  end

  def event_name
    EVENTS[self.event_id]
  end
end
