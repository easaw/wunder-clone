Wunderclone.Views.ListsEditModal = Backbone.View.extend({
  template: JST['lists/edit_modal'],
  
  events: {
    'click .hide-modal': 'hideModal',
    'click' : 'checkHideModal',
    'click .delete-list' : 'deleteList'
  },
  
  hideModal: function(){
    event.preventDefault();
    event.stopPropagation();
    this.$el.find('#modal').removeClass("is-active");
  },
  
  checkHideModal: function(event){
    if(event.target.id == "modal"){
      event.preventDefault();
      this.$el.find('#modal').removeClass("is-active");
    }
  },
  
  initialize: function(){
  },
  
  render: function(){
    var content = this.template({list: this.model})
    this.$el.html(content).appendTo('#modal-container');
    
    return this;
  },
  
  edit: function(model){
    this.$el.empty();
    this.model = model;
    this.render();
    this.$el.find('#modal').addClass("is-active");
  },
  
  deleteList: function(){
    var that = this;
    event.preventDefault();
    
    this.model.destroy({
      success: function(){
        that.hideModal();
        Wunderclone.Models.inbox.trigger("show");
      },
      error: function(data){
        console.log("ERROR", data);
      }
    });
  },
})