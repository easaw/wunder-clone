Wunderclone.Views.ListsShow = Backbone.View.extend({
  template: JST['lists/show'],
  
  className: "list-show",
  
  events: {
    'click .show-completed-button' : 'toggleCompleted',
    'click .task-link' : 'selectTask',
    'dblclick .task-link': 'editTask'
  },
  
  toggleCompleted: function(){
    event.preventDefault();
    $('#completed-div').toggleClass('hidden');
  },
  
  selectTask: function(event){
    event.preventDefault();
    $taskEl = $(event.target);
    $('.task-link').removeClass("selected-task");
    $taskEl.toggleClass("selected-task");
  },
  
  editTask: function(event){
    event.stopPropagation();
    var taskId = $(event.currentTarget).attr("data-id");
    var task = Wunderclone.Collections.tasks.get(taskId);
    
    this.$el.closest('#content-container').addClass("expand");
    
    var editView = new Wunderclone.Views.TasksEdit({
      model: task
    });
    
    this.swapSideView(editView);
  },
  
  swapSideView: function(view){
    if (this.sideView && this.sideView.removeSubViews){
      this.sideView.removeSubViews();
    }
    this.sideView && this.sideView.remove();
    this.sideView = view;
    
    $('#side-content').html(view.render().$el);
  },
  
  initialize: function(){
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    
    this.sideView = null;
    
    this.activeTasks = this.model.activeTasks();
    this.completedTasks = this.model.completedTasks();
    
    this.listenTo(this.completedTasks, "add remove sync", this.manageShowCompleted);
    this.listenTo(this.model, "remove", this.showInbox);

    this.createSubViews();
  },
  
  showInbox: function(){
    Wunderclone.Models.inbox.trigger("show");
  },
  
  manageShowCompleted: function(){
    if (this.completedTasks.length == 0){
      this.$el.find('.show-completed-button').addClass('hidden');
    } else {
      this.$el.find('.show-completed-button').removeClass('hidden');
    }
  },
  
  
  render: function(){
    var content = this.template({list: this.model});
    this.$el.html(content);
    
    this.$activeSelector = this.$el.find('#active-div');
    this.$completedSelector = this.$el.find('#completed-div');
    
    this.manageShowCompleted()
    
    this.attachSubViews();
    this.renderSubViews();
    
    return this;
  },
  
  removeSubViews: function(){
    this.$el.closest('#content-container').removeClass("expand");
    
    if (this.sideView != null){
      this.sideView.remove();
      this.sideView = null;
    }
    
    this._subViews.forEach(function (subView){
      subView.remove();
    });
    
    this._subViews = [];
  },
  
  createSubViews: function(){
    var that = this;
    this._subViews = this._subViews || [];
    
    this.activeTasksView = new Wunderclone.Views.TasksActive({
      collection: this.activeTasks
    })
    
    this.completedTasksView = new Wunderclone.Views.TasksCompleted({
      collection: this.completedTasks
    })
    
    this._subViews.push(this.activeTasksView, this.completedTasksView);
  },
  
  attachSubViews: function(){
    this.$activeSelector.html(this.activeTasksView.$el);
    this.$completedSelector.html(this.completedTasksView.$el);
  },
  
  renderSubViews: function(){
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }
  
})