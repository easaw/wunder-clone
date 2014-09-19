Wunderclone.Models.Task = Backbone.Model.extend({
  
  urlRoot: "/api/tasks",
  
  validate: function(attrs, options){
    if (attrs.task){
      if( attrs.task.name && attrs.task.name.length < 1){
        return "Must enter name of task";
      }
    }
  },
  
  initialize: function(attr, options){
    if (options && options.list){
      this.list = options.list; 
    }
    
  },
  
  setDateAttr: function(){
    this.set('due_day', this.dueDate());
    this.set('due_month', this.dueMonth());
    this.set('due_year', this.dueYear());
  },
  
  checkDueToday: function(){
    this.setDateAttr();
    var today = new Date;
    var todayDate = today.getDate();
    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();
    dateToday = Date.UTC(todayYear, todayMonth, todayDate);
    dateCompare = Date.UTC(this.get('due_year'), this.get('due_month'), this.get('due_day'));
    var ms = Math.abs(dateToday-dateCompare);
    var days = Math.floor(ms/1000/60/60/24);
    
    if (days <= 1){
      return true;
    } else {
      return false;
    }
  },
  
  dueDate: function(){
    return new Date(this.get("due_date")).getDate();
  },
  
  dueMonth: function(){
    return new Date(this.get("due_date")).getMonth();
  },
  
  dueYear: function(){
    return new Date(this.get("due_date")).getFullYear();
  }
})