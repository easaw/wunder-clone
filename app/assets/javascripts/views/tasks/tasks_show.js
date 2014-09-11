Wunderclone.Views.TasksShow = Backbone.View.extend({
  tagName: "li",
  template: JST['tasks/show'],
  
  events: {
    'click button.complete-button': 'completeTask',
    'click div.star' : 'starTask'
  },
  
  starTask: function(event){
    event.preventDefault();
    event.stopPropagation();
    
    var that = this;
    if (this.model.get('starred') == false){
      $(event.target).addClass("starred");
      this.model.set('starred', true);
      this.model.save({task: {'starred' : true }});
    } else {
      $(event.target).removeClass("starred");
      this.model.set('starred', true);
      this.model.save({task: {'starred' : false }});
    }
  },
  
  checkStar: function(){
    if (this.model.get('starred')){
      this.$el.find('.star').addClass("starred")
    }
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$el.html(content);
    this.checkStar();
    
    return this;
  },
  
  initialize: function(options){
    var that = this;
    this.list = Wunderclone.Collections.lists.getOrFetch(this.model.get('list_id'));
    this.activeTasks = this.list.activeTasks();
    this.completedTasks = this.list.completedTasks();
    this.listenTo(this.model, "add change remove sync", this.render);
    this.listenTo(this.model, "change:completed", this.changeCompleted);
  },
  
  changeCompleted: function(){
    if (this.activeTasks.contains(this.model) && this.model.get("completed") == true){
      this.activeTasks.remove(this.model);
      this.completedTasks.add(this.model);
    } else if (this.completedTasks.contains(this.model) && this.model.get("completed") == false){
      this.completedTasks.remove(this.model);
      this.activeTasks.add(this.model);
    }
  },
  
  completeTask: function(event){
    event.stopPropagation();
    event.preventDefault();
    var that = this;
    if (this.model.get('completed') == false){
      this.model.set('completed', true); 
      this.updateLatLng();
      this.model.save({task: {'completed': true}}, {
        success: function(model){
          that.activeTasks.remove(that.model);
          that.completedTasks.add(that.model);
        }
      });
    } else if (this.model.get('completed') == true){
      this.model.set('completed', false);
      this.model.save({task: {'completed': false}}, {
        success: function(model){
          that.completedTasks.remove(that.model);
          that.activeTasks.add(that.model);
        }
      });
    }
  },
  
  updateLatLng: function(){
    var that = this;
    if (!navigator.geolocation) {
        // innerHTML = 'Geolocation is not available';
    } else {
      navigator.geolocation.getCurrentPosition(function(position) {
        that.model.set({
          "lat": position.coords.latitude,
          "lng": position.coords.longitude
        });
        that.model.save({task:
          {
          "lat": position.coords.latitude,
          "lng": position.coords.longitude
          }
        });
        
      });
    }
    
    
  },
})