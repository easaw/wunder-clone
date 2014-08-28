Wunderclone.Routers.Lists = Backbone.Router.extend({
  
  
  initialize: function(options){
    this.$rootEl = options.$rootEl;
    this.lists = options.lists;
  },
  
  routes: {
    '' : 'listsIndex',
    'lists/:id' : 'listsShow'
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
    
    console.log("list show yo");
    
    this._swapView(showView);
  },
  
  _swapView: function(newView){
    if (this.currentView) {
      this.currentView.remove();
    }
    
    this.$rootEl.html(newView.render().$el);
  }
  
  
});
