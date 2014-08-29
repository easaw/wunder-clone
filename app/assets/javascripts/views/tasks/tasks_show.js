Wunderclone.Views.TasksShow = Backbone.View.extend({
  tagName: "li",
  template: JST['tasks/show'],
  
  render: function(){
    var content = this.template({task: this.model});
    this.$subEl.append(content);
    return this;
  },
  
  initialize: function(options){
    this.$subEl = options.$subEl;
    this.render();
    this.listenTo(this.model, "add change remove sync", this.render);
  }
})