Wunderclone.Routers.Lists = Backbone.Router.extend({
  
  
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.lists = options.lists;
  },
  
  routes: {
    '' : 'listsIndex',
    'lists/new' : 'listsNew',
    'lists/:id' : 'listsShow',
    'lists/:id/edit' : 'listsEdit'
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
    var lists = new Wunderclone.Models.List();
    var newView = new Wunderclone.Views.ListsForm({
      collection: this.lists,
      model: list
    });
    
    this._swapView(newView);
  },
  
  listsIndex: function(){
    var indexView = new Wunderclone.Views.ListsIndex({
      collection: this.lists
    });
    
    $('#lists-index').html(indexView.render().$el);
  },
  
  listsShow: function(id){
    var list = this.lists.getOrFetch(id);
    var showView = new Wunderclone.Views.ListsShow({
      model: list
    });
    
    this._swapView(showView);
  },
  
  _swapView: function(newView){
    if (this.currentView) {
      this.currentView.remove();
    }
    
    this.$rootEl.html(newView.render().$el);
  }
  
  
});
