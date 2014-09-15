# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :task do
    name { Faker::Lorem.sentence(3) }
    list_id { rand(1..9)}
  end
end
