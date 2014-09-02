Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
  
  events: {
  },
  
  tagName: 'ul',
  
  initialize: function(options){
    this.listenTo(this.collection, "remove add", this.render);
    
    this.inbox = options.inbox;
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
  },
  
  render: function(){
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
  
  showSpecifiedList: function(list){
    // $(".list-link").removeClass("selected-list");
    // var $list = $('[data-id='+ list.id +']')
    // $list.toggleClass("selected-list");
    this.inboxView.selectList();
    // Backbone.history.navigate("#/lists/" + list.id, {trigger: true});
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
    
    this.inboxView = new Wunderclone.Views.ListsCard({model: this.inbox});
    
    this.collection.each(function(list){
      var listCardView = new Wunderclone.Views.ListsCard({model: list});
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
