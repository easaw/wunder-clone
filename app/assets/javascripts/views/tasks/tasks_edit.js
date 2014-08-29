Wunderclone.Views.TasksEdit = Backbone.View.extend({
  tagName: 'form',
  
  className: 'edit-task-form',
  
  template: JST["tasks/edit"],
  
  events: {
    'submit':'submit'
  },
  
  initialize: function(options){
    this.list = options.list;
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$el.html(content);
    
    return this;
  },
  
  submit: function(){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.model.save(attrs, {
      success: function (task) {
        Backbone.history.navigate("#/lists/" + that.list.id, { trigger: true });
      }
    });
  }
})