Wunderclone.Views.ListsCard = Backbone.View.extend({
  template: JST['lists/card'],
  
  tagName: "li",
  
  className: "list-link",
  
  events: {
    'click' : 'selectList',
    'click .edit-button' : 'editList'
  },
  
  editList: function(){
    // var editView = new Wunderclone.Views.ListsEdit({model: this.model});
    Wunderclone.Views.listsEditModal.edit(this.model);
    // editView.render().$el.appendTo('#modal');
  },
  
  initialize: function(options){
    this.editable = options.editable;
    this.activeTasks = this.model.activeTasks();
    this.listenTo(this.activeTasks, "add remove sync", this.render);
    this.listenTo(this.model, "show", this.selectList);
  },
  
  render: function(){
    var content = this.template({
      list: this.model,
      activeTasks: this.activeTasks
    });
    this.$el.html(content);
    
    return this;
  },
  
  selectList: function(){
    event.preventDefault();
    $(".list-link").removeClass("selected-list editable");
    this.$el.toggleClass("selected-list");
    this.showEditLink();
    Backbone.history.navigate("#/lists/" + this.model.id, {trigger: true});
  },
  
  showEditLink: function(){
    
    if (this.editable === true){
      this.$el.toggleClass('editable');
    }
  }
  
  
})