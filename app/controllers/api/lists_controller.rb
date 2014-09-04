class Api::ListsController < ApplicationController
  before_action :require_signed_in
  # before_action :require_destroy_ability, only: [:destroy]
  
  def create
    @list = current_user.owned_lists.build(list_params)
    
    if @list.save
      #should remove notifications count / use jbuilder partial
      trigger_share_notification(json: @list)
      render "show"
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      # trigger_share_notification(json: @list)
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
  
  
  def trigger_share_notification(list)
    if !list_params[:shared_user_ids].nil?
      
      list_params[:shared_user_ids].each do |user_id|
        notification = User.find(user_id).unread_notifications.last
        notification_partial = render_to_string(
                partial: "notifications/notification",
                formats: [:html],
                #change naming
                locals: {notification: notification}
        )
        Pusher["notifications-#{user_id}"].trigger("new", {list:  list, notification: notification_partial})
      end
    end
  end
  
  def trigger_delete_notification(list)
    # if list.
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
