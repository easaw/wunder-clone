Wunderclone.Routers.Lists = Backbone.Router.extend({
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.lists = options.lists;
    this.tasks = options.tasks;
  },
  
  routes: {
    'lists/:id' : 'listsShow'
  },
  
  listsShow: function(id){
    var that = this;
    var list = this.lists.getOrFetch(id);
    Wunderclone.Models.activeList = list;
    
    var showView = new Wunderclone.Views.ListsShow({
      model: list
    });
    
    that._swapView(showView);
    Wunderclone.Views.tasksNew.changeList(list);
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
