Wunderclone.Views.ListsForm = Backbone.View.extend({
  tagName: 'form',
  
  template: JST['lists/form'],
  
  render: function(){
    var content = this.template({
      list: this.model
    });
    this.$el.html(content);
    
    return this;
  },
  
  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.serializeJSON();
    this.model.collection = this.collection;
    this.model.save(attrs, {
      success: function (list) {
        that.collection.add(list);
        Backbone.history.navigate("", { trigger: true });
      }
    });
  }
});