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
            Wunderclone.Views.listsEditModal = createListsEditModal();
            Wunderclone.Views.listsNewModal = createListsNewModal();
          }
        })
      }
    });
  }
};

function createListsEditModal(){
  var editModalView = new Wunderclone.Views.ListsEditModal();
  return editModalView;
}

function createListsNewModal(){
  var newModalView = new Wunderclone.Views.ListsNewModal();
  return newModalView;
}

function createListsIndex (){
  var lists = Wunderclone.Collections.lists;
  var inbox = lists.findWhere({name: "Inbox"});
  Wunderclone.Models.inbox = inbox;

  var indexView = new Wunderclone.Views.ListsIndex({
    inbox: inbox,
    collection: lists
  });

  $('#lists-index').html(indexView.render().$el);
  inbox.trigger('show');

  return indexView;
}


$(document).ready(function(){
  Wunderclone.initialize();
});
