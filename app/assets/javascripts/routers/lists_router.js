Wunderclone.Routers.Lists = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.lists = options.lists;
    this.tasks = options.tasks;
  },
  
  routes: {
    'tasks/:id/edit' : 'tasksEdit',
    'lists/new' : 'listsNew',
    'lists/:id' : 'listsShow',
    'lists/:id/edit' : 'listsEdit',
  },
  
  tasksEdit: function(id){
    var task = this.tasks.getOrFetch(id);
    var editView = new Wunderclone.Views.TasksEdit({
      model: task
    });
    
    this._swapView(editView);
  },
  
  listsEdit: function(id){
    var list = this.lists.getOrFetch(id);
    var editView = new Wunderclone.Views.ListsForm({
      collection: this.lists,
      model: list
    });
    
    this._swapView(editView);
  },
  
  listsNew: function(){
    var list = new Wunderclone.Models.List();
    var newView = new Wunderclone.Views.ListsForm({
      collection: Wunderclone.Collections.lists,
      model: list
    });
    
    this._swapView(newView);
  },
  
  
  listsShow: function(id){
    var that = this;
    var list = this.lists.getOrFetch(id);
    list.fetch({
      success: function(){
        var showView = new Wunderclone.Views.ListsShow({
          model: list
        });
        that._swapView(showView);
      }
    }); 
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
