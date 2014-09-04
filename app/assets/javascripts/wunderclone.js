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

            generateCuratedLists();
            Wunderclone.Views.curatedListsIndex = createCuratedListsIndex();
            Wunderclone.Views.userListsIndex = createUserListsIndex();
            Wunderclone.Views.tasksNew = createTasksNewView();
            Wunderclone.Views.listsEditModal = createListsEditModal();
            Wunderclone.Views.listsNewModal = createListsNewModal();
            bindClickOutCallbacks();
            bindFocusOutCallbacks();
            Backbone.history.start();
            
            Wunderclone.Models.inbox.trigger('show');
          }
        })
      }
    });
  }
};


function bindFocusOutCallbacks(){
  var focusOutCallBacks = [Wunderclone.Views.tasksNew.deactivateForm];
  $(document).on('focusout', function(){
    focusOutCallBacks.forEach(function(callBack){
      callBack();
    })
  })
}

window.Wunderclone.bindFocusOutCallbacks = bindFocusOutCallbacks;

function bindClickOutCallbacks(){
  $(document).on('click', function(event){
    $('#content-container').removeClass("expand");
    $('.notifications-container').removeClass('show-activities');
    Wunderclone.Views.tasksNew.deactivateDate();
    Wunderclone.Views.tasksNew.deactivateForm();
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

function generateCuratedLists(){
  var inbox = Wunderclone.Collections.lists.findWhere({name: "Inbox"});
  Wunderclone.Models.inbox = inbox;
  Wunderclone.Models.starredList = new Wunderclone.Models.CuratedList({type: "starred"});
  Wunderclone.Models.todayList = new Wunderclone.Models.CuratedList({type: "today"});
}

function createCuratedListsIndex(){
  var curatedIndexView = new Wunderclone.Views.CuratedIndex({
    inbox: Wunderclone.Models.inbox,
    starredList: Wunderclone.Models.starredList,
    todayList: Wunderclone.Models.todayList
  });

  $('#lists-index').html(curatedIndexView.render().$el);
  return curatedIndexView;
}


function createUserListsIndex (){
  var userIndexView = new Wunderclone.Views.UserIndex({
    collection: Wunderclone.Collections.lists
  });

  $('#lists-index').append(userIndexView.render().$el);
  return userIndexView;
}


$(document).ready(function(){
  Wunderclone.initialize();
  
  Wunderclone.otherUsers = {};
  $.getJSON("api/users", function(data){
    data.forEach(function(user_data){
      Wunderclone.otherUsers[user_data['email']] = user_data['id'];
    })
  });
  
});
