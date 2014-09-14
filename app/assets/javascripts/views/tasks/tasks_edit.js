Wunderclone.Views.TasksEdit = Backbone.View.extend({
  tagName: 'div',
  
  className: 'edit-task-view group',
  
  template: JST["tasks/edit"],
  
  events: {
    'click .update-task':'submit',
    'click .delete-task': 'deleteTask',
    'click': 'handleClick',
    'mousedown .star' : 'starTask',
    'focusout input' : 'submit',
    'click .hide-edit': 'hideEdit'
  },
  
  createMap: function(){
    L.mapbox.accessToken = "pk.eyJ1IjoiZXJ1YmkiLCJhIjoidWlKM1FQayJ9.1SGO52uN4uie6TDWJZHGIg";
    var mapContainer = this.$el.find('#map')[0];
    this.map = L.mapbox.map(mapContainer, 'erubi.jff3bc7l');
    this.myLayer = L.mapbox.featureLayer().addTo(this.map);
    
    var lng = this.model.get("lng");
    var lat = this.model.get("lat");
    
    if(lng && lat){
      this.updateMap();
    }
    
  },
  
  updateMap: function(){
    var that = this;
    
    var lng = that.model.get("lng");
    var lat = that.model.get("lat");
    this.map.setView([lat, lng], 15);
      this.map.invalidateSize();

    this.myLayer.setGeoJSON({
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [lng, lat]
          },
          properties: {
              'title': 'Completed Task Here!',
              'marker-color': '#ff8888',
              'marker-symbol': 'star'
          }
      });
    
  },
  
  hideEdit: function(){
    event.preventDefault();
    event.stopPropagation();
    $('#content-container').removeClass("expand");
  },
  
  handleClick: function(event){
    event.stopPropagation();
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
  
  initialize: function(options){
    this.listenTo(this.model, "change sync", this.render);
    this.listenTo(this.model, "change:lat change:lng", this.updateMap);
    this.listId = this.model.get('list_id');
    this.list = Wunderclone.Collections.lists.get(this.listId);
    this.render();
  },
  
  render: function(){
    var content = this.template({task: this.model});
    this.$el.html(content);
    this.checkStar();
    this.createMap();
    return this;
  },
  
  deleteTask: function(){
    var that = this;
    event.preventDefault();
    
    this.model.destroy({
      success: function(){
        that.list.activeTasks().remove(that.model);
        that.list.completedTasks().remove(that.model);
        Backbone.history.navigate("#/lists/" + that.listId, { trigger: true });
      },
      error: function(data){
        console.log("ERROR", data);
      }
    });
  },
  
  submit: function(){
    var that = this;
    event.preventDefault();
    var attrs = this.$el.find(".edit-task-form").serializeJSON();
    this.model.set(attrs);
    this.model.save(attrs);
  }
})