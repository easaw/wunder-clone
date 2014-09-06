Wunderclone.Views.StarredShow = Backbone.View.extend({
  template: JST['lists/starred_show'],
  
  className: "list-show",
  
  events: {
    'click .task-link' : 'selectTask',
    'dblclick .task-link': 'editTask'
  },
  
  initialize: function(){
    if (this._subViews && this._subViews.length > 0){
      this.removeSubViews();
    }
    this.tasks = this.model.activeTasks();
    
    this.sideView = null;
    
    this.listenTo(Wunderclone.Collections.tasks, "add change remove", this.render);
  },
  
  render: function(){
    if (this._subViews){
      this.removeSubViews();
    }
    
    var content = this.template({list: this.model});
    this.$el.html(content);
    this.$miniListsContainer = this.$el.find('#starred-lists-container');
    
    
    this.splitByList();
    this.createSubViews();
    this.attachSubViews();
    this.renderSubViews();
    Wunderclone.Views.tasksNew.changeList(Wunderclone.Models.inbox, {type: "starred"});
    return this;
  },
  
  splitByList: function(){
    var that = this;
    this.tasks.comparator = function(model){
      return model.get("list_id");
    }
    this.tasks.sort();
    
    this.tasksByList = {};
    this.tasks.forEach(function(task){
      var list_id = task.get("list_id");
      if (that.tasksByList[list_id]){
        that.tasksByList[list_id].push(task);
      } else {
        that.tasksByList[list_id] = [task];
      }
    })
  },
  
  
  createSubViews: function(){
    var that = this;
    
    this._subViews = this._subViews || [];

    Object.keys(this.tasksByList).forEach(function(list_id){
        var list = Wunderclone.Collections.lists.get(list_id);
        var starredTasks = that.tasksByList[list_id]; // could be subset?
        var miniListView = new Wunderclone.Views.MiniListShow({
          model: list,
          miniListTasks: starredTasks
        });
        that._subViews.push(miniListView);
    });
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
  
  attachSubViews: function(){
    var that = this;
    this._subViews.forEach(function(subView){
      that.$miniListsContainer.append(subView.$el);
    });
  },
  
  renderSubViews: function(){
    this._subViews.forEach(function(subView){
      subView.render();
    });
  }
})