Wunderclone.Views.CuratedCard = Backbone.View.extend({
  template: JST['lists/curated_card'],
  
  tagName: "li",
  
  className: "list-link",
  
  events: {
    'click' : 'selectList'
  },
  
  initialize: function(options){
    this.activeTasks = this.model.activeTasks();
    this.listenTo(this.activeTasks, "add remove sync change", this.render);
    this.listenTo(this.model, "add remove sync change", this.render);
    this.listenTo(this.model, "show", this.selectList);
    this.listenTo(this.model, "highlight", this.highlightList);
  },
  
  
  highlightList: function(){
    event.preventDefault();
    $(".list-link").removeClass("selected-list editable");
    this.$el.toggleClass("selected-list");
  },
  
  render: function(){
    this.activeTasks = this.model.activeTasks()
    
    var content = this.template({
      list: this.model,
      tasks: this.activeTasks
    });
    this.$el.html(content);
    
    if (this.model === Wunderclone.Models.inbox){
      this.$el.find(".list-icon").addClass("inbox");
      this.$el.addClass("inbox-top-border");
    } else if (this.model === Wunderclone.Models.starredList){
      this.$el.find(".list-icon").addClass("starred");
    } else  if (this.model === Wunderclone.Models.todayList){
      this.$el.find(".list-icon").addClass("today");
    }
    return this;
  },
  
  selectList: function(){
    event.preventDefault();
    $(".list-link").removeClass("selected-list editable");
    this.$el.toggleClass("selected-list");
    Backbone.history.navigate("#/lists/" + this.model.id, {trigger: true});
  }
  
})