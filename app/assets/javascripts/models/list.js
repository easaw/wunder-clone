Wunderclone.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",
  
  validate: function(attrs, options){
    if ( attrs != undefined && attrs.list.name.length < 1 ){
      return "Must enter name of list";
    }
  },
  
  tasks: function(){
    this._tasks = this._tasks ||
      Wunderclone.Collections.tasks.listFilter(this, {});
    return this._tasks;
  },
  
  activeTasks: function(){
    this._activeTasks = this._activeTasks ||
      Wunderclone.Collections.tasks.listFilter(this, {state: 'active'});
    return this._activeTasks;
  },
  
  completedTasks: function(){
    this._completedTasks = this._completedTasks ||
      Wunderclone.Collections.tasks.listFilter(this, {state: 'completed'});
    return this._completedTasks;
  }
});
