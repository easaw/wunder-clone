class User < ActiveRecord::Base
  validates :name, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6, allow_nil: true}
  
  before_validation :ensure_session_token
  after_create :init
  after_create :guest_setup
  
  attr_reader :password
  
  has_attached_file :avatar,
    styles: { small: "50x50>" }
  
  validates_attachment_content_type(
    :avatar,
    content_type: /\Aimage\/.*\Z/
  )
  
  has_many :notifications, inverse_of: :user, dependent: :destroy
  
  has_many(
  :owned_lists,
  inverse_of: :owner,
  dependent: :destroy,
  class_name: "List",
  foreign_key: :owner_id,
  primary_key: :id
  )
  
  has_many(
  :owned_tasks,
  through: :owned_lists,
  source: :tasks
  )
  
  has_many(
  :list_shares,
  dependent: :destroy,
  inverse_of: :user,
  class_name: "ListShare",
  foreign_key: :user_id,
  primary_key: :id
  )
  
  has_many(
  :shared_lists,
  through: :list_shares,
  source: :list
  )
  
  has_many(
  :shared_tasks,
  through: :shared_lists,
  source: :tasks
  )
  
  def init
    self.owned_lists.create(name: "Inbox")
  end
  
  def guest_setup
    return unless self.guest

    lists = List.create([
      {name: "Groceries", owner_id: self.id},
      {name: "Home", owner_id: self.id},
      {name: "Catch Em All", owner_id: self.id}
    ])

    grocery_list = self.owned_lists.find_by(name: "Groceries")
    home_list = self.owned_lists.find_by(name: "Home")
    pokemon_list = self.owned_lists.find_by(name: "Catch Em All")

    tasks = Task.create([
      {name: "Carrots", list_id: grocery_list.id, due_date: Date.today},
      {name: "Apples", list_id: grocery_list.id, due_date: Date.today},
      {name: "Eggs", list_id: grocery_list.id, due_date: Date.today},
      {name: "Clean the living room", list_id: home_list.id, starred: true},
      {name: "Walk the dog", list_id: home_list.id, due_date: Date.today},
      {name: "Squirtle", list_id: pokemon_list.id, starred: true},
      {name: "Geodude", list_id: pokemon_list.id, starred: true},
      {name: "Rapidash", list_id: pokemon_list.id, starred: true},
      {name: "Machop", list_id: pokemon_list.id}
    ])
    
    pika = User.find_by(email: "pika@example.com")
    ListShare.create(list_id: pokemon_list.id, user_id: pika.id)
    
  end
  
  def unread_notifications
    self.notifications.where(is_read: false)
  end
  
  def inbox
    self.owned_lists.find_by(name: "Inbox")
  end
  
  def lists
    self.owned_lists + self.shared_lists
  end
  
  def tasks
    self.owned_tasks + self.shared_tasks
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
  
  
  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user
      return user.is_password?(password) ? user : nil
    end
  end
  
  def self.create_with_omniauth(auth)
    User.create(
      provider: auth['provider'],
      uid: auth['uid'],
      name: auth["info"]["name"],
      email: auth["info"]["email"]
      )
  end
  
  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def self.new_guest
    u = User.create(:name => "guest", :email => "guest_#{Time.now.to_i}#{rand(99)}@example.com", guest: true)
    u.save(validate: false)
    u
  end
 
end
