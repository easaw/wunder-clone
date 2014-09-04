Wunderclone.Views.MiniListShow = Backbone.View.extend({
  template: JST['lists/mini_list_show'],
  
  tagName: 'ul',
  className: 'mini-list-view',
  
  initialize: function(options){
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
    this.collection = options.starredTasks;
    
  },
  
  render: function(){
    var content = this.template();
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
    var that = this;
    this._subViews = this._subViews || [];
    
    this.collection.forEach(function(task){
      var taskShowView = new Wunderclone.Views.TasksShow({model: task});
      that._subViews.push(taskShowView);
    });
  },
  
  attachSubViews: function(){
    var that = this;
    this._subViews.forEach(function(subView){
      that.$el.append(subView.$el);
    });
  },
  
  renderSubViews: function(){
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }
  
  
})