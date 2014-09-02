class Api::NotificationsController < ApplicationController
  
  def index
    @notifications = current_user.unread_notifications
    render "index"
  end
end
