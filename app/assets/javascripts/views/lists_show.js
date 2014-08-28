Wunderclone.Views.ListsShow = Backbone.CompositeView.extend({

  template: JST['lists/show'],
  
  initialize: function(){
    var view = this;
    this.tasks = this.model.tasks();
    this.listenTo(this.tasks, "sync", this.render);
    this.listenTo(this.tasks, "add", this.addTask);
    this.listenTo(this.tasks, "remove", this.removeTask);
    
    this.tasks.each(function(task){
      view.addTask(task);
    });
    
    var taskNewView = new Wunderclone.Views.TasksNew({
      model: this.model
    });
    
    this.addSubview(".tasks-new", taskNewView);
    
    this.tasks.each(function(task){
      this.addTask(task);
    });
  },
  
  addTask: function(task){
    var tasksShow = new Wunderclone.Views.TasksShow({task: task});
    this.addSubview(".tasks", tasksShow);
  },
  
  removeTask: function(task) {
    var subview = _.find(
      this.subviews(".tasks"),
      function (subview) {
        return subview.model === task;
      }
    );
    
    this.removeSubView(".tasks", subview);
  },
  
  render: function(){
    var content = this.template({ list: this.model });
    this.$el.html(content);
    
    this.attachSubviews();
    
    return this;
  }

});
