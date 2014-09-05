class Api::ListsController < ApplicationController
  before_action :require_signed_in
  before_action :require_destroy_ability, only: [:destroy]
  
  def create
    @list = current_user.owned_lists.build(list_params)
    
    if @list.save
      #should remove notifications count / use jbuilder partial
      trigger_share_notification()
      render "show"
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      trigger_update_notification()
      render "show"
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    shared_users = @list.shared_users
    trigger_delete_notification(shared_users)
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
  
  
  def trigger_share_notification()
    return unless !list_params[:shared_user_ids].nil?
      
    list_params[:shared_user_ids].each do |user_id|
      Pusher["notifications-#{user_id}"].trigger("new", {})
    end
  end
  
  def trigger_delete_notification(users)
    return unless !users.nil?
    users.each do |user|
      Pusher["notifications-#{user.id}"].trigger("destroy", {})
    end
  end
  
  def trigger_update_notification(users)
    return unless !list_params[:shared_user_ids].nil?
      
    list_params[:shared_user_ids].each do |user_id|
      Pusher["notifications-#{user_id}"].trigger("update", {})
    end
  end
 
  def require_destroy_ability
    @list = List.find(params[:id])
    return false if (@list.owner_id != current_user.id)
    return false if (current_user.inbox == @list)
  end

  def list_params
    params.require(:list).permit(:name, :shared_user_ids => [])
  end
  
end
