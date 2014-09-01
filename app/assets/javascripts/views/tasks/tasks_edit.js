Wunderclone.Views.TasksEdit = Backbone.View.extend({
  tagName: 'div',
  
  className: 'edit-task-view group',
  
  template: JST["tasks/edit"],
  
  events: {
    'click .update-task':'submit',
    'click .delete-task': 'deleteTask',
    'click .star' : 'starTask'
  },
  
  starTask: function(event){
    event.preventDefault();
    event.stopPropagation();
    
    var that = this;
    if (this.model.get('starred') == false){
      this.model.save({task: {'starred' : true }}, {
        success: function(){
          $(event.target).addClass("starred")
        }
      })
    } else {
      this.model.save({task: {'starred' : false }}, {
        success: function(){
          $(event.target).removeClass("starred")
        }
      })
    }
  },
  
  checkStar: function(){
    if (this.model.get('starred')){
      this.$el.find('.star').addClass("starred")
    }
  },
  
  initialize: function(options){
    this.listenTo(this.model, "change sync", this.render);
    this.listId = this.model.get('list_id');
    this.render();
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$el.html(content);
    this.checkStar();
    
    return this;
  },
  
  deleteTask: function(){
    var that = this;
    event.preventDefault();
    this.model.destroy({
      success: function(){
        Backbone.history.navigate("#/lists/" + that.listId, { trigger: true });
      },
      error: function(data){
        console.log("ERROR", data);
      }
    });
  },
  
  submit: function(){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.model.save(attrs, {
      success: function (task) {
        Backbone.history.navigate("#/lists/" + that.listId, { trigger: true });
      }
    });
  }
})