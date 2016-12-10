var MapWrapper = function(container, center, zoomLevel){
  this.googleMap = new google.maps.Map(container, {
    center: center,
    zoom: zoomLevel
  });
  this.markers = [];
};
