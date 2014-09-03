window.Wunderclone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
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
            
            createModelRefs();
            Wunderclone.Views.listsIndex = createListsIndex();
            Wunderclone.Views.tasksNew = createTasksNewView();
            Wunderclone.Views.listsEditModal = createListsEditModal();
            Wunderclone.Views.listsNewModal = createListsNewModal();
            bindFocusOutCallbacks();
            bindClickOutCallbacks();
            Backbone.history.start();
            
            Wunderclone.Models.inbox.trigger('show');
          }
        })
      }
    });
  }
};

function generateCuratedLists(){
  var stars = Wunderclone.Collections.tasks.where({starred: true})
}

function bindFocusOutCallbacks(){
  var focusOutCallBacks = [Wunderclone.Views.tasksNew.deactivateForm];
  $(document).on('focusout', function(){
    focusOutCallBacks.forEach(function(callBack){
      callBack();
    })
  })
}

function bindClickOutCallbacks(){
  $(document).on('click', function(event){
    $('#content-container').removeClass("expand");
    $('.notifications-container').removeClass('show-activities');
  })
}

function createTasksNewView(){
  var newTaskView = new Wunderclone.Views.TasksNew();
  // debugger
  return newTaskView;
}

function createListsEditModal(){
  var editModalView = new Wunderclone.Views.ListsEditModal();
  return editModalView;
}

function createListsNewModal(){
  var newModalView = new Wunderclone.Views.ListsNewModal();
  return newModalView;
}

function createModelRefs(){
  var lists = Wunderclone.Collections.lists;
  var inbox = lists.findWhere({name: "Inbox"});
  Wunderclone.Models.inbox = inbox;
  Wunderclone.Models.activeList = Wunderclone.Models.inbox;
}

function createListsIndex (){
  var indexView = new Wunderclone.Views.ListsIndex({
    inbox: Wunderclone.Models.inbox,
    collection: Wunderclone.Collections.lists
  });

  $('#lists-index').html(indexView.render().$el);
  return indexView;
}


$(document).ready(function(){
  Wunderclone.initialize();
});
