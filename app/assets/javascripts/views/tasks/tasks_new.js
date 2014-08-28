Wunderclone.Views.TasksNew = Backbone.View.extend({
  template: JST["tasks/new"],
  
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    
    return this;
  }
})