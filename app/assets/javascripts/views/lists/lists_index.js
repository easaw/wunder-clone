Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
  
  events: {
    'click .list-link' : 'showLink'
  },
  
  initialize: function(options){
    var view = this;
    this.inbox = this.collection.findWhere({name: "Inbox"});
    this.lists = this.collection.without(this.collection.findWhere({id: this.inbox.id}));
    
    //TODO shouldn't have to do this, need to parse tasks from lists collection
    this.inbox.fetch();
    this.lists.forEach(function(list){
      list.fetch();
    })
    
    this.listenTo(this.collection, "remove add change", this.render);
  },
  
  showInbox: function(){
    $(".list-link").removeClass("selected-list");
    var $inbox = $('a[data-id='+ this.inbox.id +']')
    $inbox.toggleClass("selected-list");
    Backbone.history.navigate("#/lists/" + this.inbox.id, {trigger: true});
  },
  
  render: function(){
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
