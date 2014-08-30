Wunderclone.Views.TasksNew = Backbone.View.extend({
  template: JST["tasks/new"],
  
  tagName: "li",
  
  events: {
    'submit .task-form':'submit'
  },
  
  bindKeypress: function() { 
    var that = this;
    this.$el.on('keydown', '.task-form', function (e) {
      if(e.which === 13){ // enter key
        event.preventDefault();
        that.submit();
      }
    });
  },
  
  initialize: function(options){
    this.newTask = new Wunderclone.Models.Task({list: this.model});
    this.bindKeypress();
    this.listenTo(this.collection, 'add', this.render);
  },
  
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.delegateEvents();
    
    return this;
  },
  
  submit: function(){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.find('.task-form').serializeJSON();
    this.collection.create(attrs);
  }
})