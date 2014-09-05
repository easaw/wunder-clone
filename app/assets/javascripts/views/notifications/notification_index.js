Wunderclone.Views.NotificationsIndex = Backbone.View.extend({
  template: JST['notifications/index'],
  
  events: {
    'click #notifications-bell': 'showActivities',
    'click .notifications-container': 'handleClick',
    'click .notifications-container a' : 'handleLinkClick'
  },
  
  initialize: function(){
    this.listenTo(this.collection, "add remove sync", this.render);
  },
  
  render: function(){
    var content = this.template({notifications: this.collection});
    this.$el.html(content);
    
    return this;
  },
  
  showActivities: function(event){
    event.stopPropagation();
    $('.notifications-container').toggleClass('show-activities');
    this.collection.each(function(notification){
      notification.set("is_read", true);
    })
  },
  
  handleClick: function(event){
    event.stopPropagation();
  },
  
  handleLinkClick: function(event){
    var modelId = $(event.target).attr("data-id");
    var model = Wunderclone.Collections.lists.get(modelId);
    model.trigger("show");
  }
  
});