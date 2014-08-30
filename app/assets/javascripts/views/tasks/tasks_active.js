Wunderclone.Views.TasksActive = Backbone.View.extend({
  template: JST['tasks/active'],
  
  tagName: 'ul',
  className: 'active-tasks',
  
  events: {
    'click .show-completed-button' : 'toggleCompleted'
  },
  
  toggleCompleted: function(){
    event.preventDefault();
    $('.completed-div').toggleClass('hidden');
  },
  
  initialize: function(options){
    this.completedTasks = options.completedTasks;
    
    this.listenTo(this.collection, 'add sync change remove', this.render);
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
  },
  
  render: function(){
    
    var content = this.template();
    this.$el.html(content);
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
    if (this.completedTasks.length < 0){
      $('.show-completed-button').addClass('hidden');
    } else {
      $('.show-completed-button').removeClass('hidden');
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
    var that = this;
    this._subViews = this._subViews || [];
    
    this.collection.each(function(task){
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