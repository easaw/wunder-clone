class Api::ListsController < ApplicationController
  before_action :require_signed_in
  before_action :require_destroy_ability, only: [:destroy]
  
  def create
    @list = current_user.owned_lists.build(list_params)
    
    if @list.save
      render "show"
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def update
    @list = List.find(params[:id])
    if @list.update(list_params)
      render "show"
    else
      render json: @list.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @list = List.find(params[:id])
    @list.destroy
  end
  
  def show
    @list = List.find(params[:id])
    # @tasks = @list.tasks
    render "show"
  end
  
  def index
    @lists = current_user.owned_lists
    render "index"
  end
  
  private
  
  def list_params
    params.require(:list).permit(:name, :shared_user_ids => [])
  end
  
end
