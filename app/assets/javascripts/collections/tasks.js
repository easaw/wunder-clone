Wunderclone.Collections.Tasks = Backbone.Collection.extend({
  model: Wunderclone.Models.Task,
  
  url: function(){
    return 'api/tasks';
  },
  
  initialize: function (models, options){
    if (options && options.list){
      this.list = options.list;
    }
  },
  
  comparator: function(task){
    return task.get('created_at');
  },
  
  listFilter: function(list, options){
    if (options.state == 'active') {
        var results = this.where({list_id: list.id, completed: false});
        return new Wunderclone.Collections.TasksSubset(results, {parentCollection: Wunderclone.Collections.tasks});
    } else if (options.state == 'completed'){
        var results = this.where({list_id: list.id, completed: true});
        return new Wunderclone.Collections.TasksSubset(results, {parentCollection: Wunderclone.Collections.tasks});
    }
  },
  
})