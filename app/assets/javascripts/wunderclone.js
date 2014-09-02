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
              $rootEl: $('#content'),
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
  var lists = Wunderclone.Collections.lists;
  var inbox = lists.findWhere({name: "Inbox"});
  var userLists = new Wunderclone.Collections.ListsSubset(
    lists.without(lists.findWhere({ id: inbox.id })),
    {parentCollection: lists}
  );

  var indexView = new Wunderclone.Views.ListsIndex({
    inbox: inbox,
    collection: userLists
  });

  $('#lists-index').html(indexView.render().$el);
  indexView.showSpecifiedList(inbox);

  return indexView;
}


$(document).ready(function(){
  Wunderclone.initialize();
});
