class SessionsController < ApplicationController
  def new
  end
  
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      sign_in(@user)
    else
      flash.now[:errors] = "Wrong username/password combo"
      render :new
    end
  end
  
  private
  
  def user_params
    params.permit(:user).require(:email, :name, :password)
  end
  
end
