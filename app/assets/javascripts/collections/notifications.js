Wunderclone.Collections.Notifications = Backbone.Collection.extend({
  url: '/api/notifications',
  
  model: Wunderclone.Models.Notification
});