Wunderclone.Views.UserNav = Backbone.View.extend({
  template: JST['user/nav'],
  
  events: {
    // 'click #user-info' : 'userDropDown'
  },
  
  render: function(){
    var content = template();
    this.$el.html(content);
  },
  
  notificationDropDown: function(){
    
  }
})