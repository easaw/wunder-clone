Wunderclone.Views.TasksNew = Backbone.View.extend({
  template: JST["tasks/new"],
  
  tagName: "li",
  
  events: {
    'submit .task-form':'submit',
    'click .star' : 'starTask'
  },
  
  initialize: function(options){
    this.list = options.list;
    this.bindKeypress();
    this.listenTo(this.collection, 'add', this.render);
  },
  
  render: function(){
    var content = this.template({list: this.list});
    this.$el.html(content);
    this.delegateEvents();
    
    return this;
  },
  
  starTask: function(event){
    event.preventDefault();
    event.stopPropagation();
    
    var that = this;
    if (this.model.get('starred') !== true){
      this.$el.find('#star').val(true);
      $(event.target).addClass("starred");
    } else {
        this.$el.find('#star').val(false);
      $(event.target).removeClass("starred");
    }
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
  
  
  submit: function(){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.find('.task-form').serializeJSON();
    this.collection.create(attrs, {
      wait: true,
    });
  }
})