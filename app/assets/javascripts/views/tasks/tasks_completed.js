Wunderclone.Views.TasksCompleted = Backbone.View.extend({
  template: JST['tasks/completed'],
  
  tagName: 'ul',
  className: 'completed-tasks',
  
  initialize: function(options){
    this.listenTo(this.collection, 'sync add change', this.render);
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
  },
  
  render: function(){
    var content = this.template({completedTasks: this.completedTasks});
    this.$el.html(content);
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
    this.createSubViews();
    this.attachSubViews();
    this.renderSubViews();
    
    return this;
  },
  
  removeSubViews: function(){
    this._subViews.forEach(function (subView){
      subView.remove();
    });
    
    this._subViews = [];
  },
  
  createSubViews: function(){
    this.completedTasks = this.collection.where({completed: true});
    
    var that = this;
    this._subViews = this._subViews || [];
    
    //task should have a list, need to update parse or check it
    this.completedTasks.forEach(function(task){
      var taskShowView = new Wunderclone.Views.TasksShow({model: task});
      that._subViews.push(taskShowView);
    });
  },
  
  attachSubViews: function(){
    var that = this;
    this._subViews.forEach(function(subView){
      that.$el.prepend(subView.$el);
    });
  },
  
  renderSubViews: function(){
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }
  
})