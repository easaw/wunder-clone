Wunderclone.Views.TasksActive = Backbone.View.extend({
  template: JST['tasks/active'],
  
  tagName: 'ul',
  className: 'active-tasks',
  
  initialize: function(options){
    
    // create a listener and custom callback for list completed event
    this.listenTo(this.collection, 'add sync change', this.render);
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
  },
  
  render: function(){
    //extra where for creating completed header/link
    this.completedTasks = this.collection.where({completed: true});
    
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
    this.activeTasks = this.collection.where({completed: false});
    
    var that = this;
    this._subViews = this._subViews || [];
    
    //task should have a list, need to update parse or check it
    this.activeTasks.forEach(function(task){
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