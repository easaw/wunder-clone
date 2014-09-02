Wunderclone.Views.ListsCard = Backbone.View.extend({
  template: JST['lists/card'],
  
  tagName: "li",
  
  className: "list-link",
  
  events: {
    'click' : 'selectList'
  },
  
  initialize: function(){
    this.activeTasks = this.model.activeTasks();
    this.listenTo(this.activeTasks, "add remove sync", this.render);
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
    $(".list-link").removeClass("selected-list");
    
    this.$el.toggleClass("selected-list");
    Backbone.history.navigate("#/lists/" + this.model.id, {trigger: true});
  }
  
  
})