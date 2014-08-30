window.Wunderclone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    //create store collection for lists
    Wunderclone.Collections.lists = new Wunderclone.Collections.Lists();
    Wunderclone.Collections.tasks = new Wunderclone.Collections.Tasks();
    
    Wunderclone.Collections.lists.fetch({
      success: function(){
        Wunderclone.Collections.tasks.fetch({
          
          success: function(){
            new Wunderclone.Routers.Lists({
              $rootEl: $('.content'),
              lists: Wunderclone.Collections.lists,
              tasks: Wunderclone.Collections.tasks
            });
            
            Backbone.history.start();
            Wunderclone.Views.listsIndex = createListsIndex();
            
          }
        })
      }
    });
  }
};

function createListsIndex (){
   var indexView = new Wunderclone.Views.ListsIndex({
     collection: Wunderclone.Collections.lists 
   });
   
   $('#lists-index').html(indexView.render().$el);
   this.inbox = Wunderclone.Collections.lists.findWhere({name: "Inbox"});
   indexView.showSpecifiedList(this.inbox);
   
   return indexView;
}


$(document).ready(function(){
  Wunderclone.initialize();
});
