require 'spec_helper'

describe User do
  
  describe 'model validations' do
    subject { FactoryGirl.build(:user) }
    
    it 'requires a name' do
      expect(FactoryGirl.build(:user, name: '')).not_to be_valid
    end
    it 'requires an email' do 
      expect(FactoryGirl.build(:user, email: '')).not_to be_valid
    end
      
    it "requires a password with at least 6 characters" do
          user = User.new password: 'short'
          user.should_not be_valid
    end
    
    it { should validate_uniqueness_of(:email) }
    
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
  
  describe 'active record validations' do
    
    it { should have_many(:owned_lists) }
    
    it { should have_many(:owned_tasks) }
    
    it { should have_many(:list_shares) }
    
    it { should have_many(:shared_lists) }
    
    it { should have_many(:shared_tasks) }
    
    it { should have_many(:notifications) }
  end
  
end
