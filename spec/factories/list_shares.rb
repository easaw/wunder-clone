# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :list_share do
    list { FactoryGirl.build(:list) }
    user_id { rand(1..9)}
  end
end
