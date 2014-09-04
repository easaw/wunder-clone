class Api::ListsController < ApplicationController
  before_action :require_signed_in
  # before_action :require_destroy_ability, only: [:destroy]
  
  def create
    @list = current_user.owned_lists.build(list_params)
    
    if @list.save
      trigger_share_notification
      render "show"# , formats: [:json]
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      triggerShareNotification
      render "show"
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy!
    render json: true
  end
  
  def show
    @list = List.find(params[:id])
    # @tasks = @list.tasks
    render "show"
  end
  
  def index
    @lists = current_user.lists
    render "index"
  end
  
  private
  
  
  def trigger_share_notification
    if !list_params[:shared_user_ids].nil?
      #trigger pusher notification
      notification = current_user.unread_notifications.last
      notification_partial = render_to_string(
        partial: "notifications/notification",
        formats: [:html],
        #change naming
        locals: {notification: Notification.new}
        )
        
      Pusher["notifications"].trigger("new", notification_partial)
    end
  end
 
  def require_destroy_ability
    @list = List.find(params[:id])
    return false if (@list.owner_id != current_user.id)
    return false if (current_user.inbox.include?(@list))
  end

  def list_params
    params.require(:list).permit(:name, :shared_user_ids => [])
  end
  
end
