require 'spec_helper'

describe Task do
  describe 'model validations' do
    subject { FactoryGirl.build(:task) }
    
    it { should validate_presence_of(:list_id) }
    
    it { should validate_presence_of(:name) }
    
    it { should ensure_length_of(:name).is_at_least(1) }
    
  end
  
  describe 'active record validations' do
    it { should belong_to(:list) }
  end
end
