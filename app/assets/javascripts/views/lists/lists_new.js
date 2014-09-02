Wunderclone.Views.ListsNewModal = Backbone.View.extend({
  template: JST['lists/new_modal'],
  
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
  
  events: {
    'click .hide-modal': 'hideModal',
    'click' : 'checkHideModal',
    'submit' : 'submit'
  },
  
  render: function(){
    // console.log("trying to render new list");
    var content = this.template();
    this.$el.html(content).appendTo('#modal-container');
    
    return this;
  },
  
  newList: function(){
    
    this.$el.empty();
    this.render();
    console.log(this.$el.find('#modal'));
    this.$el.find('#modal').addClass("is-active");
  },
  
  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.find('.new-list-form').serializeJSON();
    Wunderclone.Collections.lists.create(attrs, {
      wait: true,
      success: function(list){
        // Wunderclone.Views.listsIndex.showSpecifiedList(list);
        that.hideModal();
        list.trigger("show");
      }
    });
  }
});