# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :notification do
    notifiable { FactoryGirl.build(:list_share) }
    event_id { rand(1..2)}
    is_read { false }
    user { FactoryGirl.build(:user) }
  end
end
