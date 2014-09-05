class Api::TasksController < ApplicationController
  before_action :require_signed_in

  def create
    @task = Task.new(task_params)
    if @task.save
      trigger_new_shared_task(@task)
      render "show"
    else
      # p @task.errors.full_messages
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    @task = Task.find(params[:id])
    trigger_new_shared_task(@task)
    @task.destroy!
    render json: true
  end
  
  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      trigger_new_shared_task(@task)
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
  
  def trigger_new_shared_task(task)
    users = task.list.shared_users
    return unless !users.nil?
    users.each do |user|
      Pusher["notifications-#{user.id}"].trigger("new-shared-task", {})
    end
  end
  
  def task_params
    params.require(:task).permit(:name, :list_id, :completed, :due_date, :starred)
  end
end
