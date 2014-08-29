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
    this.list = options.list;
      
    // this.$el.on('click button.complete-button', function(){
    //   event.preventDefault();
    //   that.completeTask();
    // });

    
    this.listenTo(this.model, "add change remove sync", this.render);
  },
  
  completeTask: function(){
    event.preventDefault();
    event.stopPropagation();
    if (this.model.get('completed') == false){
      this.model.save({'completed': true});
    } else {
      this.model.save({'completed': false});
    }
    
    // this.model.
    $(event.currentTarget).toggleClass('completed-tasks');
    // console.log(event.currentTarget);
  },
  
  editTask: function(){
    var that = this;
    event.preventDefault();
    Backbone.history.navigate("#/lists/" + that.list.id + "/tasks/" + this.model.id + "/edit", { trigger: true });
  }
})