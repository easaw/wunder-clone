class User < ActiveRecord::Base
  validates :name, :email, :password, presence: true
  validates :password, length: {minimum: 6, allow_nil: true}
  
  before_validation :ensure_session_token
  attr_reader :password
  
  def self.get_by_credentials(username, password)
    user = User.find_by(username: username)
    if user && user.is_password?(password)
      return 
    end
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end
  
  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end
  
  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end
  
  def ensure_session_token
    if !self.session_token
      self.session_token = User.generate_session_token
    end
  end
  
  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
  end
end
