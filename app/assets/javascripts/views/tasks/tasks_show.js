Wunderclone.Views.TasksShow = Backbone.View.extend({
  tagName: "li",
  template: JST['tasks/show'],
  
  event: {
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$subEl.append(content);
    return this;
  },
  
  initialize: function(options){
    var that = this;
    this.$subEl = options.$subEl;
    this.$subEl.on('click .complete-button', '.task-link', function(){
      that.completeTask();
    })
    this.render();
    this.listenTo(this.model, "add change remove sync", this.render);
  },
  
  completeTask: function(){
    event.preventDefault();
    this.model.set('completed', true);
    console.log(event.currentTarget);
  }
})