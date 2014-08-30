Wunderclone.Views.TasksShow = Backbone.View.extend({
  tagName: "li",
  template: JST['tasks/show'],
  
  events: {
    'click a.task-edit-link' : 'editTask',
    'click button.complete-button' : 'completeTask'
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$el.html(content);
    return this;
  },
  
  initialize: function(options){
    var that = this;
    this.list = Wunderclone.Collections.lists.getOrFetch(this.model.get('list_id'));
    this.activeTasks = this.list.activeTasks();
    this.completedTasks = this.list.completedTasks();
    this.listenTo(this.model, "add change remove sync", this.render);
  },
  
  completeTask: function(){
    var that = this;
    event.preventDefault();
    if (this.model.get('completed') == false){
      this.model.save({task: {'completed': true}}, {
        success: function(model){
          that.activeTasks.remove(that.model);
          that.completedTasks.add(that.model);
        }
      });
    } else if (this.model.get('completed') == true){
      this.model.save({task: {'completed': false}}, {
        success: function(model){
          that.completedTasks.remove(that.model);
          that.activeTasks.add(that.model);
        }
      });
    }
  },
  
  editTask: function(){
    var that = this;
    event.preventDefault();
    Backbone.history.navigate("#/lists/" + that.list.id + "/tasks/" + this.model.id + "/edit", { trigger: true });
  }
})