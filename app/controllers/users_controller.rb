class UsersController < ApplicationController
  before_action :require_signed_out
  
  def new
    @user = User.new()
    render :new
  end
  
  def create
    @user = params[:user] ? User.new(user_params) : User.new_guest
    if @user.save
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :name, :password, :avatar)
  end
  
end
