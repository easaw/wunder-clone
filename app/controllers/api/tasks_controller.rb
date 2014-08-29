class Api::TasksController < ApplicationController
  before_action :require_signed_in

  def create
    @task = List.find(params[:list_id]).tasks.new(task_params)
    if @task.save
      render "show"
    else
      p @task.errors.full_messages
      render json: @task.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def destroy
    @task = Task.find(params[:id])
    @task.destroy!
    render json: true
  end
  
  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      p @task
      render "show"
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end
  
  def show
    @task = Task.find(params[:id])
    render "show"
  end
  
  private
  
  def task_params
    params.require(:task).permit(:name, :list_id, :completed, :due_date, :starred)
  end
end
