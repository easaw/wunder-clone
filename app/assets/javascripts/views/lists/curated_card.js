Wunderclone.Views.CuratedCard = Backbone.View.extend({
  template: JST['lists/curated_card'],
  
  tagName: "li",
  
  className: "list-link",
  
  events: {
    'click' : 'selectList'
  },
  
  initialize: function(options){
    this.activeTasks = this.model.activeTasks();
    if(this.activeTasks)
    this.listenTo(this.activeTasks, "add remove sync change", this.render);
    this.listenTo(this.model, "add remove sync change", this.render);
    this.listenTo(this.model, "show", this.selectList);
  },
  
  render: function(){
    this.activeTasks = this.model.activeTasks()
    
    var content = this.template({
      list: this.model,
      tasks: this.activeTasks
    });
    this.$el.html(content);
    
    return this;
  },
  
  selectList: function(){
    event.preventDefault();
    $(".list-link").removeClass("selected-list editable");
    this.$el.toggleClass("selected-list");
    Backbone.history.navigate("#/lists/" + this.model.id, {trigger: true});
  }
  
})