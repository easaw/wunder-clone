class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  application_helper :signed_in?, :current_user
  
  def sign_in(user)
    user.reset_session_token!
    session[:session_token] = user.session_token
  end
  
  def sign_out
    current_user.reset_session_token!
    session[:session_token] = nil
  end
  
  def signed_in?
    !!current_user
  end
  
  def current_user
    User.find_by(session_token: session[:session_token])
  end
end
