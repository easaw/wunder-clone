# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140831015228) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "list_shares", force: true do |t|
    t.integer  "list_id",    null: false
    t.integer  "user_id",    null: false
    t.string   "status",     null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "list_shares", ["list_id", "user_id"], name: "index_list_shares_on_list_id_and_user_id", unique: true, using: :btree

  create_table "lists", force: true do |t|
    t.integer  "owner_id",   null: false
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "lists", ["owner_id"], name: "index_lists_on_owner_id", using: :btree

  create_table "tasks", force: true do |t|
    t.integer  "list_id",          null: false
    t.string   "name",             null: false
    t.date     "due_date"
    t.date     "remind_date"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "completed"
    t.integer  "assigned_user_id"
    t.boolean  "starred"
  end

  add_index "tasks", ["list_id"], name: "index_tasks_on_list_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "name",                null: false
    t.string   "email",               null: false
    t.string   "session_token",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.boolean  "guest"
    t.string   "password_digest"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", using: :btree

end
