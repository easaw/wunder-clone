Wunderclone.Models.Task = Backbone.Model.extend({
  
  validate: function(attrs, options){
    if (attrs.task.name && attrs.task.name.length < 1){
      return "Must enter name of task";
    }
  },
  
  initialize: function(attr, options){
    if (options && options.list){
      this.list = options.list; 
    }
  }
})