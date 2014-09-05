class Api::NotificationsController < ApplicationController
  
  def index
    @notifications = current_user.unread_notifications
    render "index"
  end
  
  def update
    @notification = Notification.find(params[:id])
    @notification.update(notification_params)  
    render json: true
  end
  
  private
  
  def notification_params
    params.require(:notification).permit(:is_read)
  end
end
