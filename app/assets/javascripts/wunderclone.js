window.Wunderclone = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    Wunderclone.Collections.notifications = new Wunderclone.Collections.Notifications();
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

            Wunderclone.generateCuratedLists();
            Wunderclone.Views.curatedListsIndex = Wunderclone.createCuratedListsIndex();
            Wunderclone.Views.userListsIndex = Wunderclone.createUserListsIndex();
            Wunderclone.Views.tasksNew = Wunderclone.createTasksNewView();
            Wunderclone.Views.listsEditModal = Wunderclone.createListsEditModal();
            Wunderclone.Views.listsNewModal = Wunderclone.createListsNewModal();
            Wunderclone.Views.notificationsIndex = Wunderclone.createNotificationsIndex();
            Wunderclone.bindClickOutCallbacks();
            Wunderclone.bindFocusOutCallbacks();
            Backbone.history.start();
            
            Wunderclone.Models.inbox.trigger('show');
          }
        })
      }
    });
  }
};


Wunderclone.bindFocusOutCallbacks = function(){
  var focusOutCallBacks = [Wunderclone.Views.tasksNew.deactivateForm];
  $(document).on('focusout', function(){
    focusOutCallBacks.forEach(function(callBack){
      callBack();
    })
  })
}

Wunderclone.bindClickOutCallbacks = function(){
  $(document).on('click', function(event){
    $('#content-container').removeClass("expand");
    $('.notifications-container').removeClass('show-activities');
    Wunderclone.Views.tasksNew.deactivateDate();
    Wunderclone.Views.tasksNew.deactivateForm();
  })
}

Wunderclone.createTasksNewView = function(){
  var newTaskView = new Wunderclone.Views.TasksNew();
  // debugger
  return newTaskView;
}

Wunderclone.createListsEditModal = function(){
  var editModalView = new Wunderclone.Views.ListsEditModal();
  return editModalView;
}

Wunderclone.createListsNewModal = function(){
  var newModalView = new Wunderclone.Views.ListsNewModal();
  return newModalView;
}

Wunderclone.generateCuratedLists = function(){
  var inbox = Wunderclone.Collections.lists.findWhere({name: "Inbox"});
  Wunderclone.Models.inbox = inbox;
  Wunderclone.Models.starredList = new Wunderclone.Models.CuratedList({type: "starred"});
  Wunderclone.Models.todayList = new Wunderclone.Models.CuratedList({type: "today"});
}

Wunderclone.createCuratedListsIndex = function(){
  var curatedIndexView = new Wunderclone.Views.CuratedIndex({
    inbox: Wunderclone.Models.inbox,
    starredList: Wunderclone.Models.starredList,
    todayList: Wunderclone.Models.todayList
  });

  $('#lists-index').html(curatedIndexView.render().$el);
  return curatedIndexView;
}

Wunderclone.createNotificationsIndex = function(){
  var notificationIndexView = new Wunderclone.Views.NotificationsIndex({
    collection: Wunderclone.Collections.notifications
  })
  
  $('#user-nav').append(notificationIndexView.render().$el);
  return notificationIndexView;
}

Wunderclone.createUserListsIndex = function(){
  var userIndexView = new Wunderclone.Views.UserIndex({
    collection: Wunderclone.Collections.lists
  });

  $('#lists-index').append(userIndexView.render().$el);
  return userIndexView;
}


$(document).ready(function(){
  Wunderclone.initialize();
});
