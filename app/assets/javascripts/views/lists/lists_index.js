Wunderclone.Views.ListsIndex = Backbone.CompositeView.extend({

  template: JST['lists/index'],
  
  
  initialize: function(){
    var view = this;
    this.listenTo(this.collection, "sync remove add change", this.render);
  },
  
  render: function(){
    var content = this.template({ lists: this.collection });
    this.$el.html(content);
    
    return this;
  }

});
