require 'spec_helper'

describe List do
  describe 'model validations' do
    subject { FactoryGirl.build(:list) }
    
    it { should validate_presence_of(:owner_id) }
    
    it { should validate_presence_of(:name) }
    
    it { should ensure_length_of(:name).is_at_least(1) }
    
  end
  
  describe 'active record validations' do
    it { should belong_to(:owner) }
    
    it { should have_many(:tasks) }
    
    it { should have_many(:list_shares) }
    
    it { should have_many(:shared_users) }
  end
end
