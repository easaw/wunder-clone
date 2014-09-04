Wunderclone.Models.CuratedList = Backbone.Model.extend({
  
  initialize: function(options){
    this.type = options.type;
    this.setAttr();
    // this.listenTo(this.tasks(), "add remove", this.triggerChange); // this.trigger.bind(this, "curatedChange"));
    this.listenTo(this.activeTasks().parentCollection, "change:starred", this.addStarredTask);
    this.listenTo(this.activeTasks().parentCollection, "add", this.addNewStarredTask);
    this.listenTo(this.completedTasks().parentCollection, "change:completed", this.addBackStarredTask);
  },

  triggerChange: function(){
    this.trigger.bind(this, "curatedChange")
  },
  
  setAttr: function(){
    switch(this.type) {
    case "starred":
      this.set({name: "Starred"});
      this.set({id: "starred"});
      this.set({})
      break;
    }
  },
  
  activeTasks: function(){
    this._activeTasks = this._activeTasks ||
     Wunderclone.Collections.tasks.curatedFilter(this.type, {completed: false});
    return this._activeTasks;
  },
  
  completedTasks: function(){
    this._completedTasks = this._completedTasks ||
     Wunderclone.Collections.tasks.curatedFilter(this.type, {completed: true});
    return this._completedTasks;
  },
  
  addNewStarredTask: function(model){
    if(model.get("starred") == true){
      this.activeTasks().add(model);
    }
  },
  
  addBackStarredTask: function(model, completed){
    if (completed == false && model.get("starred") == true){
      this.activeTasks().add(model);
    } else {
      this.activeTasks().remove(model);
    }
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