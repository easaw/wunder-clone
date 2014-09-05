Wunderclone.Views.UserIndex = Backbone.View.extend({

  template: JST['lists/user_index'],
  
  events: {
    'click .add-list-container' : 'addList'
  },
  
  addList: function(){
    event.preventDefault();
    Wunderclone.Views.listsNewModal.newList();
  },
  
  initialize: function(options){
    var that = this;
    
    this.grabUserLists();  
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
    this.listenTo(this.collection, "add remove", this.render);
    
  },
  
  grabUserLists: function(){
    var that = this;
    
    var results = this.collection.reject(function(list){
      return list.id == Wunderclone.Models.inbox.id;
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
    
    Wunderclone.activeList.trigger("show");
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
    
    this._subViews.forEach(function(subView){
      that.$el.find("#user-lists-ul").append(subView.$el);
    });
  },
  
  renderSubViews: function(){
    
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }

});
