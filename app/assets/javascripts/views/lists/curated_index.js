Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
  
  events: {
    'click .add-list-container' : 'addList'
  },
  
  addList: function(){
    event.preventDefault();
    Wunderclone.Views.listsNewModal.newList();
  },
  
  initialize: function(options){
    var that = this;
    this.inbox = options.inbox;
    
    this.listenTo(Wunderclone.Collections.tasks, "add change:starred", this.render)
    this.listenTo(Wunderclone.Models.starredList.tasks(), "add sync change reset remove", this.render);
  
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
  },
  
  grabUserLists: function(){
    var that = this;
    
    var results = this.collection.reject(function(list){
      return list.id == that.inbox.id
    })
    
    this.userLists = new Wunderclone.Collections.ListsSubset(
      results,
      {parentCollection: this.collection}
    );
    
  },
  
  render: function(){
    var that = this;
    
    this.grabUserLists();
    
    var content = this.template({});
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
    
    this.inboxView = new Wunderclone.Views.ListsCard({
      model: this.inbox,
      editable: false
    });
    
    this.starredView = new Wunderclone.Views.CuratedCard({
      model: Wunderclone.Models.starredList
    });
    
    this.userLists.each(function(list){
      var listCardView = new Wunderclone.Views.ListsCard({
        model: list,
        editable: true
      });
      that._subViews.push(listCardView);
    });
  },
  
  attachSubViews: function(){
    var that = this;
    this.$el.find(".lists-ul").append(this.inboxView.$el);
    
    if (Wunderclone.Models.starredList.tasks().length > 0){
      this.$el.find(".lists-ul").append(this.starredView.$el);
    }
    
    this._subViews.forEach(function(subView){
      that.$el.find(".lists-ul").append(subView.$el);
    });
  },
  
  renderSubViews: function(){
    this.inboxView.render();
    
    if (Wunderclone.Models.starredList.tasks().length > 0){
      this.starredView.render();
    }
    
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }

});
