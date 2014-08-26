require 'spec_helper'

describe User do
  
  describe 'model validations' do
    
    it 'requires a name' do
      expect(FactoryGirl.build(:user, name: '')).not_to be_valid
    end
    it 'requires an email' do 
      expect(FactoryGirl.build(:user, email: '')).not_to be_valid
    end
    it 'requires a password' do 
      expect(FactoryGirl.build(:user, password: '')).not_to be_valid
    end
    it 'requires a unique email' do
      FactoryGirl.build(:user, email: 'me@example.com')
      expect(FactoryGirl.build(:user, email: 'me@example.com')).not_to be_valid
    end
  end
  
  describe 'randomy generated attributes' do
    
    user = FactoryGirl.build(:user)
    
    it 'generates names' do
      expect(user.name).not_to be_nil
    end
    
    it 'generates emails' do
      expect(user.email).not_to be_nil
    end
    
    it 'generates passwords' do
      expect(user.password_digest).not_to be_nil
    end
    
  end
  
end
