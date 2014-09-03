Wunderclone.Views.CuratedIndex = Backbone.View.extend({

  template: JST['lists/curated_index'],
  
  initialize: function(options){
    var that = this;
    this.inbox = options.inbox;
    this.starredList = options.starredList;
    
    this.listenTo(Wunderclone.Collections.tasks, "change:starred", this.render)
    this.listenTo(Wunderclone.Models.starredList.tasks(), "add remove", this.render);
  
    
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
  },
  
  
  render: function(){
    var that = this;
    
    
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
    
    this.inboxView = new Wunderclone.Views.CuratedCard({
      model: this.inbox,
    });
    
    if(this.starredList.tasks().length > 0){
      this.starredView = new Wunderclone.Views.CuratedCard({
        model: this.starredList
      });
    }
    
  },
  
  attachSubViews: function(){
    var that = this;
    this.$el.find(".lists-ul").append(this.inboxView.$el);
    
    if (Wunderclone.Models.starredList.tasks().length > 0){
      this.$el.find("#curated-lists-ul").append(this.starredView.$el);
    }
    
  },
  
  renderSubViews: function(){
    this.inboxView.render();
    
    if (Wunderclone.Models.starredList.tasks().length > 0){
      this.starredView.render();
    }
    
    // this._subViews.forEach(function(subView){
//       subView.render();
//     });
  }

});
