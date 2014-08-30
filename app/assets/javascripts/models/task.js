Wunderclone.Models.Task = Backbone.Model.extend({
  
  validate: function(attrs, options){
    if (attrs.task.name && attrs.task.name.length < 1){
      return "Must enter name of task";
    }
  },
  
  initialize: function(attr, options){
    // console.log("ATTR",attr);
    // console.log("OPTIONS", options);
    // if (options && options.collection.list){
     // this.list = Wunderclone.Collections.lists.get(options.collection.list.id);
    // }
    if (options && options.list){
      this.list = options.list; 
    }
  }

  // urlRoot: function() {
//     return "api/lists/" + this.collection.list.id + "/tasks";
//   }
})