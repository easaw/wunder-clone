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
    
    this.set('due_day', this.dueDate());
    this.set('due_month', this.dueMonth());
    this.set('due_year', this.dueYear());
  },
  
  checkDueToday: function(){
    var today = new Date;
    var todayDate = today.getDate();
    var todayMonth = today.getMonth();
    var todayYear = today.getFullYear();
    // var results = this.where({dueDay: todayDay, dueMonth: todayMonth, dueYear: todayYear, completed: options.completed});
    dateToday = Date.UTC(todayYear, todayMonth, todayDate);
    dateCompare = Date.UTC(this.get('due_year'), this.get('due_month'), this.get('due_day'));
    var ms = Math.abs(dateToday-dateCompare);
    var days = Math.floor(ms/1000/60/60/24);
    
    return days <= 1;
  },
  
  dueDate: function(){
    return new Date(this.get("due_date")).getDate();
  },
  
  dueMonth: function(){
    return new Date(this.get("due_date")).getMonth();
  },
  
  dueYear: function(){
    return new Date(this.get("due_date")).getFullYear();
  },
})