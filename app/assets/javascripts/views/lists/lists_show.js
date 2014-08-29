Wunderclone.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],
  
  intialize: function(){
    this.tasks = this.model.tasks();
    this.listenTo(this.model, "add change remove sync", this.render)
  },
  
  render: function(){
    
    var content = this.template({list: this.model});
    this.$el.html(content);
    
    return this;
  },
  
  removeSubViews: function(){
    
  },
  
  createSubViews: function(){
    var that = this;
    this._subViews = this._subViews || [];
    this.tasks.each(function(task){
      var subView = new WunderClone.Views.TasksShow({model: task});
      that._subViews.push(subView);
    });
  },
  
  renderSubViews: function(){
    
  }
  
  
})