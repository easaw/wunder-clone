Wunderclone.Views.ListsIndex = Backbone.View.extend({

  template: JST['lists/index'],
  
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
  }

});
