class TasksController < ApplicationController

  def create
    @task = Task.new(task_params)
    if @task.save
      redirect_to list_url(@task.list)
    else
      flash.now[:errors] = @task.errors.full_messages
    end
  end
  
  def destroy
    @task = Task.find(params[:id])
    @task.destroy
    redirect_to list_url(@task.list)
  end
  
  def update
    @task = Task.find(params[:id])
    @task.update(task_params)
    redirect_to list_url(@task.list)
  end
  
  private
  
  def task_params
    params.require(:task).permit(:name, :list_id, :completed)
  end
end
