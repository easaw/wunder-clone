class ListsController < ApplicationController
  before_action :require_signed_in
  before_action :require_destroy_ability, only: [:destroy]
  
  def new
    @users = other_users
    @list = List.new()
    # fail
    render :new
  end
  
  def create
    @list = current_user.owned_lists.build(list_params)
    # @list = List.new(list_params)
    # @list.owner_id = current_user.id
    if @list.save
      redirect_to lists_url
    else
      @users = other_users
      flash.now[:errors] = @list.errors.full_messages
      render :new
    end
  end
  
  def edit
    @list = List.find(params[:id])
    @users = other_users
    render :edit
  end
  
  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      redirect_to lists_url
    else
      flash.now[:errors] = @list.errors.full_messages
      render :edit
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy
    redirect_to root_url
  end
  
  def show
    #TODO pass in tasks of list
    @list = List.find(params[:id])
    @tasks = @list.tasks
    # @active_tasks = @tasks.where(completed: !true)
    # @completed_tasks = @tasks.where(completed: true)
    render :show
  end
  
  def index
    @inbox = current_user.inbox
    @lists = current_user.lists
    render :index
  end
  
  private
  
  def list_params
    params.require(:list).permit(:name, :shared_user_ids => [])
  end
  
end
