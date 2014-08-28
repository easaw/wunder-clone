class Api::TasksController < ApplicationController
  before_action :require_signed_in

  def create
    @task = Task.new(task_params)
    if @task.save
      render "show"
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end
  
  def destroy
    @task = Task.find(params[:id])
    @task.destroy!
  end
  
  def update
    @task = Task.find(params[:id])
    if @task.update(task_params)
      render "show"
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end
  
  private
  
  def task_params
    params.require(:task).permit(:name, :list_id, :completed, :due_date, :starred)
  end
end
