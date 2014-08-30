Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
  
  events: {
    'click .list-link' : 'showLink'
  },
  
  initialize: function(options){
    var view = this;
    this.listenTo(this.collection, "remove add change", this.render);
  },
  
  showSpecifiedList: function(list){
    $(".list-link").removeClass("selected-list");
    var $list = $('a[data-id='+ list.id +']')
    $list.toggleClass("selected-list");
    Backbone.history.navigate("#/lists/" + list.id, {trigger: true});
  },
  
  render: function(){
    this.inbox = this.collection.findWhere({name: "Inbox"});
    this.lists = this.collection.without(this.collection.findWhere({id: this.inbox.id}));
    var content = this.template({ lists: this.lists, inbox: this.inbox });
    this.$el.html(content);
    
    return this;
  },
  
  showLink: function(){
    event.preventDefault();
    $(".list-link").removeClass("selected-list");
    
    var $list = $(event.target);
    $list.toggleClass("selected-list");
    var listId = $(event.target).attr("data-id");
    Backbone.history.navigate("#/lists/" + listId, {trigger: true});
  }

});
