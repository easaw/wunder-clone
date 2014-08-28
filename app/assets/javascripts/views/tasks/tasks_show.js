Wunderclone.Views.TasksShow = Backbone.View.extend({
  tagName: "li",
  template: JST['tasks/show'],
  
  render: function(){
    console.log(this.model);
    var content = this.template({task: this.model});
    this.$el.html(content);
    
    return this;
  }
})