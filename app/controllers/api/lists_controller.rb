class Api::ListsController < ApplicationController
  before_action :require_signed_in
  before_action :require_destroy_ability, only: [:destroy]
  
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
    check_removed_shared_user(@list.shared_users, @list.id)
    if @list.update(list_params)
      
      trigger_update_notification({json: list_params}, @list.id)
      render "show"
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    shared_users = @list.shared_users
    trigger_delete_notification(shared_users, @list.id)
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
  
  def check_removed_shared_user(users, list_id)
    users.each do |user|
      if list_params[:shared_user_ids].nil?
        trigger_delete_notification([user], list_id)
      elsif !list_params[:shared_user_ids].nil? && !list_params[:shared_user_ids].include?(user.id)
        trigger_delete_notification([user], list_id)
      end
    end
  end
  
  def trigger_share_notification(list_data)
    return unless !list_params[:shared_user_ids].nil?
    list_params[:shared_user_ids].each do |user_id|
      if user_id != current_user.id
        Pusher["notifications-#{user_id}"].trigger("new", {list_data: list_data})
      end
    end
  end
  
  def trigger_delete_notification(users, list_id)
    return unless !users.nil?
    users.each do |user|
      if user.id != current_user.id
        Pusher["notifications-#{user.id}"].trigger("destroy", {list_id: list_id})
      end
    end
  end
  
  def trigger_update_notification(list_data, list_id)
    return unless !list_params[:shared_user_ids].nil?
      
    list_params[:shared_user_ids].each do |user_id|
      if user_id != current_user.id
        Pusher["notifications-#{user_id}"].trigger("update", {list_data: list_data, list_id: list_id})
      end
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
