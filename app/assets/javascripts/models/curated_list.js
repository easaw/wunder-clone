Wunderclone.Models.CuratedList = Backbone.Model.extend({
  
  initialize: function(options){
    this.type = options.type;
    this.setAttr();
    // this.listenTo(this.tasks(), "add remove", this.triggerChange); // this.trigger.bind(this, "curatedChange"));
    this.listenTo(this.activeTasks().parentCollection, "change:starred", this.addStarredTask);
  },

  triggerChange: function(){
    this.trigger.bind(this, "curatedChange")
  },
  
  setAttr: function(){
    switch(this.type) {
    case "starred":
      this.set({name: "Starred"});
      this.set({id: "starred"});
      break;
    }
  },
  
  activeTasks: function(){
    this._tasks = this._tasks || Wunderclone.Collections.tasks.curatedFilter(this.type);
    return this._tasks;
  },
  
  addStarredTask: function(model, starred){
    if (starred){
      this.activeTasks().add(model);
    } else {
      this.activeTasks().remove(model);
    }
  },
  
  grabTasks: function(){
    this._tasks = Wunderclone.Collections.tasks.curatedFilter(this.type);
  }
})