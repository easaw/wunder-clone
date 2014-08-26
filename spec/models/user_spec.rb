require 'spec_helper'

describe User do
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
