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
    var myLayer = L.mapbox.featureLayer().addTo(this.map);
    
  },
  
  updateMap: function(){
    if (!navigator.geolocation) {
        // innerHTML = 'Geolocation is not available';
    } else {
        map.locate();
    }
    
    map.on('locationfound', function(e) {
        map.fitBounds(e.bounds);

        myLayer.setGeoJSON({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [e.latlng.lng, e.latlng.lat]
            },
            properties: {
                'title': 'Here I am!',
                'marker-color': '#ff8888',
                'marker-symbol': 'star'
            }
        });
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