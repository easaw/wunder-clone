Wunderclone.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",
  
  
  validate: function(attrs, options){
    if (attrs.list.name.length < 1){
      return "Must enter name of list";
    }
  },
  
  activeTasks: function(){
    this._activeTasks = this._activeTasks ||
      Wunderclone.Collections.tasks.listFilter(this, {state: 'active'})
    return this._activeTasks;
  },
  
  completedTasks: function(){
    this._completedTasks = this._completedTasks ||
      Wunderclone.Collections.tasks.listFilter(this, {state: 'completed'})
    return this._completedTasks;
  }
});
