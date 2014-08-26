class SessionsController < ApplicationController
  before_action :require_signed_out
  
  def new
  end
  
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Wrong username/password combo"]
      render :new
    end
  end
  
  def destroy
    sign_out
    redirect_to new_session_url
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :name, :password)
  end
  
end
