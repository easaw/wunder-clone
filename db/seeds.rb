# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

users = User.create([
  {name: "TestUser", email: "test@example.com", password: "password"},
  {name: "Pikachu", email: "pika@example.com", password: "password"},
  {name: "Bill Murray", email: "murray@example.com", password: "password"}
  ])

# murray = User.find_by(email: "murray@example.com")
#
# lists = List.create([
#   {name: "Groceries", owner_id: murray.id},
#   {name: "Home", owner_id: murray.id},
#   {name: "Catch Em All", owner_id: murray.id}
# ])
#
# grocery_list = murray.owned_lists.find_by(name: "Groceries")
# home_list = murray.owned_lists.find_by(name: "Home")
# pokemon_list = murray.owned_lists.find_by(name: "Catch Em All")
#
# tasks = Task.create([
#   {name: "Carrots", list_id: grocery_list.id, due_date: Date.today},
#   {name: "Apples", list_id: grocery_list.id, due_date: Date.today},
#   {name: "Eggs", list_id: grocery_list.id, due_date: Date.today},
#   {name: "Clean the living room", list_id: home_list.id},
#   {name: "Walk the dog", list_id: home_list.id, due_date: Date.today},
#   {name: "Squirtle", list_id: pokemon_list.id, starred: true},
#   {name: "Geodude", list_id: pokemon_list.id, starred: true},
#   {name: "Rapidash", list_id: pokemon_list.id, starred: true},
#   {name: "Machop", list_id: pokemon_list.id}
# ])



  # grocery_list = @user.owned_lists.build(name: "Groceries")
#   home_list = @user.owned_lists.build(name: "Home")
#   grocery_list.tasks.build(name: "Carrots")
#   grocery_list.tasks.build(name: "Apples")
#   grocery_list.tasks.build(name: "Eggs")
#   home_list.tasks.build(name: "Clean the living room")
#   home_list.tasks.build(name: "Walk the dog")