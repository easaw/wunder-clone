class ListsController < ApplicationController
  before_action :require_signed_in
  
  def new
    @list = List.new()
    render :new
  end
  
  def create
    @list = List.new(list_params)
    @list.owner_id = current_user.id
    if @list.save
      redirect_to lists_url
    else
      flash.now[:errors] = @list.errors.full_messages
      render :new
    end
  end
  
  def edit
    @list = List.find(params[:id])
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
    render :show
  end
  
  def index
    @lists = current_user.owned_lists
    render :index
  end
  
  private
  
  def list_params
    params.require(:list).permit(:name)
  end
end
