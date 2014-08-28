class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  helper_method :signed_in?, :current_user, :other_users
  
  def sign_in(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end
  
  def sign_out
    current_user.reset_session_token!
    current_user = nil
    session[:session_token] = nil
  end
  
  def signed_in?
    !!current_user
  end
  
  def current_user
    User.find_by(session_token: session[:session_token])
  end
  
  def require_signed_in
    if !signed_in?
      redirect_to new_user_url
    end
  end
  
  def require_signed_out
    if signed_in?
      redirect_to root_url
    end
  end
  
  def other_users
    User.all.where.not(id: current_user.id)
  end
end
