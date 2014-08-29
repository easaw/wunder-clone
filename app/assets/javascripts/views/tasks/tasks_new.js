Wunderclone.Views.TasksNew = Backbone.View.extend({
  template: JST["tasks/new"],
  
  events: {
    'submit .task-form':'submit'
  },
  
  bindKeypress: function() { 
    var that = this;
    this.$subEl.on('keydown', '.task-form', function (e) {
      if(e.which === 13){ // enter key
        event.preventDefault();
        that.submit();
      }
    });
  },
  
  initialize: function(options){
    this.$subEl = options.$subEl;
    this.newTask = new Wunderclone.Models.Task({list: this.model});
    this.render();
    this.bindKeypress();
  },
  
  render: function(){
    var content = this.template({list: this.model});
    this.$subEl.append(content);
    
    return this;
  },
  
  submit: function(){
    var that = this;
    event.preventDefault();
    var attrs = this.$subEl.find('.task-form').serializeJSON();
    // console.log($('.task-form').serializeJSON());
    this.collection.create(attrs);
  }
})