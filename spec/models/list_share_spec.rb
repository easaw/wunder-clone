require 'spec_helper'

describe ListShare do
  describe 'model validations' do
    subject { FactoryGirl.build(:list_share) }
    
    it { should validate_presence_of(:user_id) }
    
    it { should validate_presence_of(:list) }
    
    it { should validate_uniqueness_of(:list_id).scoped_to(:user_id).with_message("can't share list with the same user twice") }
    
  end
  
  describe 'active record validations' do
    it { should belong_to(:list) }
    
    it { should belong_to(:user) }
    
    it { should have_many(:notifications) }
  end
end
