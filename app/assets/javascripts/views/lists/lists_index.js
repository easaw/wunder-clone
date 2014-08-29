Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
 //render with default list
  
  events: {
    'click .list-link' : 'showLink'
  },
  
  initialize: function(){
    var view = this;
    this.inbox = this.collection.findWhere({name: "Inbox"});
    this.lists = this.collection.without(this.collection.findWhere({id: this.inbox.id}));
    this.inbox.fetch();
    this.lists.forEach(function(list){
      list.fetch();
    })
    this.listenTo(this.collection, "remove add change", this.render);
  },
  
  render: function(){
    var content = this.template({ lists: this.lists, inbox: this.inbox });
    this.$el.html(content);
    
    return this;
  },
  
  showLink: function(){
    event.preventDefault();
    var $list = $(event.target);
    $(".list-link").removeClass("selected-list");
    $list.toggleClass("selected-list");
    var listId = $(event.target).attr("data-id");
    Backbone.history.navigate("#/lists/" + listId, {trigger: true});
  }

});
