Wunderclone.Routers.Lists = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.lists = options.lists;
    this.tasks = options.tasks;
  },
  
  routes: {
    'tasks/:id/edit' : 'tasksEdit',
    'lists/:id' : 'listsShow',
  },
  
  tasksEdit: function(id){
    var task = this.tasks.getOrFetch(id);
    var editView = new Wunderclone.Views.TasksEdit({
      model: task
    });
    
    this._swapView(editView);
  },
  
  
  listsShow: function(id){
    var that = this;
    var list = this.lists.getOrFetch(id);
    list.fetch(); 
    var showView = new Wunderclone.Views.ListsShow({
      model: list
    });
    that._swapView(showView);
  },
  
  _swapView: function(view){
    if (this._currentView && this._currentView.removeSubViews){
      this._currentView.removeSubViews();
    }
    this._currentView && this._currentView.remove();
    this._currentView = view;
    
    this.$rootEl.html(view.render().$el);
  }
  
  
});
