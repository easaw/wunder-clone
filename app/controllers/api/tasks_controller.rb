class Api::TasksController < ApplicationController
  before_action :require_signed_in

  def create
    @task = Task.new(task_params)
    if @task.save
      users = @task.list.shared_users
      trigger_new_shared_task(users, @task.list.owner.id, json: @task)
      render "show"
    else
      # p @task.errors.full_messages
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    @task = Task.find(params[:id])
    users = @task.list.shared_users
    trigger_delete_shared_task(users, @task.list.owner.id, json: @task)
    @task.destroy!
    render json: true
  end
  
  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      users = @task.list.shared_users
      trigger_update_shared_task(users, @task.list.owner.id, {json: task_params}, @task.id)
      render "show"
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end
  
  def show
    @task = Task.find(params[:id])
    render "show"
  end
  
  def index
    @tasks = current_user.tasks
    render "index"
  end
  
  private
  
  def trigger_new_shared_task(users, owner_id, task_data)
    return unless !users.nil?
    users.each do |user|
      if user.id != current_user.id
        Pusher["notifications-#{user.id}"].trigger("new-shared-task", {task_data: task_data})
      end
    end
    if owner_id != current_user.id
      Pusher["notifications-#{owner_id}"].trigger("new-shared-task", {task_data: task_data})
    end
  end
  
  def trigger_delete_shared_task(users, owner_id, task_data)
    return unless !users.nil?
    users.each do |user|
      if user.id != current_user.id
        Pusher["notifications-#{user.id}"].trigger("delete-shared-task", {task_data: task_data})
      end
    end
    if owner_id != current_user.id
      Pusher["notifications-#{owner_id}"].trigger("delete-shared-task", {task_data: task_data})
    end
  end
  
  def trigger_update_shared_task(users, owner_id, task_data, task_id)
    return unless !users.nil?
    users.each do |user|
      if user.id != current_user.id
        Pusher["notifications-#{user.id}"].trigger(
        "update-shared-task",
        {task_data: task_data, task_id: task_id}
        )
      end
    end
    
    if owner_id != current_user.id
      Pusher["notifications-#{owner_id}"].trigger(
        "update-shared-task",
        {task_data: task_data, task_id: task_id}
      )
    end
  end
  
  def task_params
    params.require(:task).permit(:name, :list_id, :completed, :due_date, :starred)
  end
end
