require 'spec_helper'

describe Notification do
  describe 'model validations' do
    subject { FactoryGirl.build(:notification) }
    
    it { should validate_presence_of(:notifiable) }
    
    it { should validate_presence_of(:user) }
    
    it { should validate_inclusion_of(:event_id).
          in_array(Notification::EVENTS.keys) }
    
    it { should validate_inclusion_of(:is_read).
          in_array([true, false]) }
    
  end
  
  describe 'active record validations' do
    it { should belong_to(:notifiable) }
    
    it { should belong_to(:user) }
  end
end
