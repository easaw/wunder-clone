Wunderclone.Views.ListsNewModal = Backbone.View.extend({
  template: JST['lists/new_list_modal'],
  
  events: {
    'click .hide-modal': 'hideModal',
    'click #save-list-button' : 'submit',
    'submit .new-list-form' : 'submit',
    'submit #share-user-form' : 'addSharedUser',
    'keyup #share-user-form input[type=text]': 'checkEmpty'
  },
  
  checkEmpty:function(event){
    if(!event.target.value){
      this.$el.find('#share-user-form').removeClass("invalid-email");
    }
  },
  
  render: function(){
    var content = this.template();
    this.$el.html(content).appendTo('#modal-container');
    return this;
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
  
  addSharedUser: function(event){
    event.preventDefault();
    this.$el.find('#share-user-form').removeClass("invalid-email");
    var email = $(event.target).serializeJSON()['user_email']
    var id = Wunderclone.otherUsers[email];
    
    if (!id){
      this.$el.find('#share-user-form').addClass("invalid-email");
      return;
    }
    
    if (this.currentSharedIds.indexOf(id) == -1){
      var newUserLi = '<li>' + email + '</li>';
      this.currentSharedIds.push(id); 
      this.$el.find('#list-members-ul').append(newUserLi);
    }
  },
  
  newList: function(){
    this.currentSharedIds = [];
    this.$el.empty();
    this.render();
    this.$el.find('#modal').addClass("is-active");
  },
  
  submit: function(event){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.find('.new-list-form').serializeJSON();
    attrs['list']['shared_user_ids'] = this.currentSharedIds;

    Wunderclone.Collections.lists.create(attrs, {
      wait: true,
      success: function(list){
        list.trigger("show");
      }
    });
    that.hideModal();
  }
});