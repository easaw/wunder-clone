Wunderclone.Views.TasksNew = Backbone.View.extend({
  template: JST["tasks/new"],
  
  events: {
    'submit .task-form':'submit',
    'mousedown .star.task-form-star' : 'starTask',
    'mousedown .task-form-date-icon' : 'selectDate',
    'mousedown .task-form-date' : 'handleClick',
    'click .task-form' : 'activateForm'
  },
  
  handleClick: function(event){
    event.stopPropagation();
  },

  activateForm: function(event){
    event.stopPropagation();
    this.$el.find('.task-form').addClass('active-task-form');
  },
  
  deactivateDate: function(){
    this.$el.find('.task-form-date').removeClass('show-date-dropdown');
    Wunderclone.bindFocusOutCallbacks();
    this.$el.find(".task-form-name").focus();
  },
  
  selectDate: function(event){
    event.preventDefault();
    event.stopPropagation();
    $(document).off("focusout");
    this.$el.find('.task-form-date').addClass('show-date-dropdown');
  },
  
  deactivateForm: function(){
    $('.task-form').removeClass('active-task-form');
  },
  
  initialize: function(options){
    this.bindKeypress();
  },
  
  changeList: function(list, options){
    if(options && options.type){
      this.type = options.type;
    } else {
      this.type = null;
    }
    this.list = list, 
    this.render();
    this.collection = this.list.activeTasks();
  },
  
  render: function(){
    var content = this.template({list: this.list});
    this.$el.html(content);
    $('#new-task-div').html(this.$el);
    this.delegateEvents();
    
    if(this.type === "starred"){
      // change placeholder
      this.$el.find('.task-form-name').attr("placeholder",
       'Add a starred item in "Inbox"...');
      this.$el.find('#star').val(true);
      this.$el.find('.task-form-star').addClass("starred")
    };
    return this;
  },
  
  starTask: function(event){
    event.preventDefault();
    event.stopPropagation();
    var attrs = this.$el.find('.task-form').serializeJSON();
    var that = this;
    var $star = this.$el.find('#star')
    if ($star.val() == "false"){
      $star.val(true);
      $(event.target).addClass("starred");
    } else {
      $star.val(false);
      $(event.target).removeClass("starred");
    }
  },
  
  bindKeypress: function() { 
    var that = this;
    this.$el.on('keydown', '.task-form', function (e) {
      if(e.which === 13){ // enter key
        event.preventDefault();
        that.submit();
      }
    });
  },
  
  
  submit: function(){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.find('.task-form').serializeJSON();
    this.collection.create(attrs, {
      wait: true,
      success: function(){
        that.render();
      }
    });
  }
})