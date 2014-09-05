Wunderclone.Views.CuratedIndex = Backbone.View.extend({

  template: JST['lists/curated_index'],
  
  initialize: function(options){
    var that = this;
    this.inbox = options.inbox;
    this.starredList = options.starredList;
    this.todayList = options.todayList;
    
    this.listenTo(Wunderclone.Collections.tasks, "change:starred", this.render);
    this.listenTo(Wunderclone.Models.starredList.activeTasks(), "add remove", this.render);
    this.listenTo(Wunderclone.Models.todayList.activeTasks(), "add remove", this.render);
    this.listenTo(Wunderclone.Collections.tasks, "change:due_date", this.render);
  
    
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
    if (Wunderclone.displayedList){
      Wunderclone.displayedList.trigger("show"); 
    }
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
    
    if(this.starredList.activeTasks().length > 0){
      this.starredView = new Wunderclone.Views.CuratedCard({
        model: this.starredList
      });
    }
    
    if(this.todayList.activeTasks().length > 0){
      this.todayView = new Wunderclone.Views.CuratedCard({
        model: this.todayList
      });
    }
    
  },
  
  attachSubViews: function(){
    var that = this;
    this.$el.find(".lists-ul").append(this.inboxView.$el);
    
    if (this.starredList.activeTasks().length > 0){
      this.$el.find("#curated-lists-ul").append(this.starredView.$el);
    }
    
    if(this.todayList.activeTasks().length > 0){
      this.$el.find("#curated-lists-ul").append(this.todayView.$el);
    }
    
  },
  
  renderSubViews: function(){
    this.inboxView.render();
    
    if (this.starredList.activeTasks().length > 0){
      this.starredView.render();
    }
    
    if (this.todayList.activeTasks().length > 0){
      this.todayView.render();
    }
    
    // this._subViews.forEach(function(subView){
//       subView.render();
//     });
  }

});
