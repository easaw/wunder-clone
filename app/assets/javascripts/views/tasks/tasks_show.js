Wunderclone.Views.TasksShow = Backbone.View.extend({
  tagName: "li",
  template: JST['tasks/show'],
  
  event: {
    // 'click button' : 'completeTask'
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$el.html(content);
    return this;
  },
  
  initialize: function(options){
    var that = this;
    
    this.$el.on('click button', function(){
      event.preventDefault();
      that.completeTask();
    });
    
    this.listenTo(this.model, "add change remove sync", this.render);
  },
  
  completeTask: function(){
    event.preventDefault();
    this.model.set('completed', true);
    console.log(event.currentTarget);
  }
})