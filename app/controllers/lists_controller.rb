class ListsController < ApplicationController
  before_action :require_signed_in
  
  def new
    @list = List.new()
    render :new
  end
  
  def create
    @list = List.new(list_params)
    if @list.save
      redirect_to lists_url
    else
      flash.now[:errors] = @list.errors.full_messages
      render :new
    end
  end
  
  def edit
    @list = List.find_by(id: params[:id])
    render :edit
  end
  
  def update
    @list = List.find_by(id: params[:id])
    if @list.update(list_params)
      redirect_to lists_url
    else
      flash.now[:errors] = @list.errors.full_messages
      render :edit
    end
  end
  
  def show
    #TODO pass in taks of list
    # @list =
  end
  
  def index
    @lists = current_user.lists
    render :index
  end
  
  private
  
  def list_params
    params.require(:list).permit(:name)
  end
end
