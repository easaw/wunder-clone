Wunderclone.Views.OldListsShow = Backbone.View.extend({
  template: JST['lists/show'],
  
  events: {
    'click .show-completed-button' : 'showCompleted'
  },
  
  initialize: function(){
    this.tasks = this.model.tasks();
    this.activeTasks = this.model.activeTasks();
    this.completedTasks = this.model.completedTasks();
    
    // this.listenTo(this.tasks, "change:completed", this.completeTask);
    this.listenTo(this.tasks, "add remove change sync", this.render);
    this.listenTo(this.model, "add change remove sync", this.render);
  },
  
  
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    
    this.$activeSelector = $('#active-tasks');
    this.$completedSelector = $('#completed-tasks');
    
    if (this._subViews){
      this.removeSubViews();
    }
    this.createSubViews();
    this.attachSubViews();
    
    return this;
  },
  
  showCompleted: function(){
    event.preventDefault();
    $('#completed-tasks').toggleClass('completed-task-list');
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
    
    var newTaskView = new Wunderclone.Views.TasksNew({
      collection: that.tasks,
      model: this.model
    });
    this._subViews.push(newTaskView);
    
    this.tasks.forEach(function(task){
      var subView = new Wunderclone.Views.TasksShow({model: task, list: that.model});
      that._subViews.push(subView);
    });
  },
  
  attachSubViews: function(){
    var that = this;
    this._subViews.forEach(function(subView){
      if (subView.model.get('completed') != true){
        that.$activeSelector.append(subView.render().$el);
      } else if (subView.model.get('completed') == true){
        that.$completedSelector.append(subView.render().$el); 
      }
    });
  }
  
  
})