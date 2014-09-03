Wunderclone.Views.CuratedCard = Backbone.View.extend({
  template: JST['lists/curated_card'],
  
  tagName: "li",
  
  className: "list-link",
  
  events: {
    'click' : 'selectList'
  },
  
  initialize: function(options){
    this.tasks = this.model.tasks();
    // this.listenTo(Wunderclone.Collections.tasks, "add change remove", this.render);
    this.listenTo(this.tasks, "add remove sync change", this.render);
    this.listenTo(this.model, "add remove sync change", this.render);
    this.listenTo(this.model, "show", this.selectList);
  },
  
  render: function(){
    this.tasks = this.model.tasks()
    
    var content = this.template({
      list: this.model,
      tasks: this.tasks
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