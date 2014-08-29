Wunderclone.Views.TasksEdit = Backbone.View.extend({
  tagName: 'form',
  
  className: 'edit-task-form',
  
  template: JST["tasks/edit"],
  
  events: {
    'click .update-task':'submit',
    'click .delete-task': 'deleteTask'
  },
  
  initialize: function(options){
    this.list = options.list;
    this.tasks = this.list.tasks();
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$el.html(content);
    
    return this;
  },
  
  deleteTask: function(){
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function(){
        Backbone.history.navigate("#/lists/" + that.list.id, { trigger: true });
      },
      error: function(data){
        console.log("ERROR", data);
      }
    });
  },
  
  submit: function(){
    console.log(this.model);
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.model.save(attrs, {
      success: function (task) {
        Backbone.history.navigate("#/lists/" + that.list.id, { trigger: true });
      }
    });
  }
})