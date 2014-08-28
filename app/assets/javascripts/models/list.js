Wunderclone.Models.List = Backbone.Model.extend({
  urlRoot: "/api/lists",
  
  tasks: function() {
    this._tasks = this._tasks ||
      new Wunderclone.Collections.Tasks([], { list: this });
    return this._tasks;
  },
  
  active_tasks: function(){
    return this.tasks().where({completed: true});
  },
  
  parse: function(payload){
    if (payload.tasks) {
      this.tasks().set(payload.tasks);
      delete payload.tasks;
    }
    
    return payload;
  }
});
