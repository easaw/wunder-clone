Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
  
  events: {
  },
  
  tagName: 'ul',
  
  className: 'lists-index-ul',
  
  initialize: function(options){
    this.listenTo(this.collection, "remove add", this.render);
    var that = this;
    this.inbox = options.inbox;
    
    this.grabUserLists();
    
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
    console.log("rendering lists index");
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
    this.$el.append(this.inboxView.$el);
    
    this._subViews.forEach(function(subView){
      that.$el.append(subView.$el);
    });
  },
  
  renderSubViews: function(){
    this.inboxView.render();
    
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }

});
