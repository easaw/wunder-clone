Wunderclone.Views.UserNav = Backbone.View.extend({
  template: JST['user/nav'],
  
  render: function(){
    var content = template();
    this.$el.html(content);
  }
})