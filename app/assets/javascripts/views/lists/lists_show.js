Wunderclone.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],
  
  initialize: function(){
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
    this.activeTasks = this.model.activeTasks();
    this.completedTasks = this.model.completedTasks();
   
    // this.listenTo(this.tasks, " remove sync", this.render);
    // this.listenTo(this.tasks, "add change remove sync", this.createSubViews);
    
    
    this.createSubViews();
  },
  
  
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    
    this.$newSelector = this.$el.find('.new-task-div');
    this.$activeSelector = this.$el.find('.active-div');
    this.$completedSelector = this.$el.find('.completed-div');
    
    this.attachSubViews();
    this.renderSubViews();
    
    return this;
  },
  
  removeSubViews: function(){
    this._subViews.forEach(function (subView){
      subView.remove();
    });
    
    this._subViews = [];
  },
  
  createSubViews: function(){
    var that = this;
    this._subViews = this._subViews || [];
    
    this.newTaskView = new Wunderclone.Views.TasksNew({
      collection: this.activeTasks,
      list: this.model
    });
    
    this.activeTasksView = new Wunderclone.Views.TasksActive({
      collection: this.activeTasks,
      completedTasks: this.completedTasks
    })
    
    this.completedTasksView = new Wunderclone.Views.TasksCompleted({
      collection: this.completedTasks
    })
    
    this._subViews.push(this.newTaskView, this.activeTasksView, this.completedTasksView);
  },
  
  attachSubViews: function(){
    this.$newSelector.html(this.newTaskView.$el);
    this.$activeSelector.html(this.activeTasksView.$el);
    this.$completedSelector.html(this.completedTasksView.$el);
  },
  
  renderSubViews: function(){
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }
  
})