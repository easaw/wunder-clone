Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
  
  events: {
    'click .list-link' : 'showLink'
  },
  
  initialize: function(){
    var view = this;
    this.inbox = this.collection.findWhere({name: "Inbox"});
    // console.log(this.inbox.get('name'));
    this.lists = this.collection.without(this.collection.findWhere({id: this.inbox.id}));
    this.listenTo(this.collection, "sync remove add change", this.render);
  },
  
  render: function(){
    var content = this.template({ lists: this.lists, inbox: this.inbox });
    this.$el.html(content);
    
    return this;
  },
  
  showLink: function(){
    event.preventDefault();
    // console.log($(event.target).attr("data-id"));
    var $list = $(event.target);
    // console.log($list);
    $list.addClass("selected-list");
    var listId = $(event.target).attr("data-id");
    Backbone.history.navigate("#/lists/" + listId, {trigger: true});
  }

});
