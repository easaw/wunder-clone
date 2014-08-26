class SessionsController < ApplicationController
  def new
  end
  
  def create
    @user = User.find_by_credentials(user_params[:email], user_params[:password])
    if @user
      sign_in(@user)
      redirect_to root_url
    else
      flash.now[:error] = "Wrong username/password combo"
      render :new
    end
  end
  
  private
  
  def user_params
    params.require(:user).permit(:email, :name, :password)
  end
  
end
