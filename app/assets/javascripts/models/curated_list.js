Wunderclone.Models.CuratedList = Backbone.Model.extend({
  
  initialize: function(options){
    this.type = options.type;
    this.setAttr();
    // this.listenTo(this.tasks(), "add remove", this.triggerChange); // this.trigger.bind(this, "curatedChange"));
    this.listenTo(this.tasks().parentCollection, "change:starred", this.addStarredTask);
  },

  triggerChange: function(){
    this.trigger.bind(this, "curatedChange")
  },
  
  setAttr: function(){
    switch(this.type) {
    case "starred":
      this.set({name: "Starred"})
      break;
    }
  },
  
  tasks: function(){
    this._tasks = this._tasks || Wunderclone.Collections.tasks.curatedFilter(this.type);
    return this._tasks;
  },
  
  addStarredTask: function(model, starred){
    if (starred){
      this.tasks().add(model);
    } else {
      this.tasks().remove(model);
    }
  },
  
  grabTasks: function(){
    this._tasks = Wunderclone.Collections.tasks.curatedFilter(this.type);
  }
})