var app = function(){

  var heatMapData = [];
  var div = document.getElementById("main-map");
  var zoomLevel = 7;


  var makeRequest = function(url, callback){
    //creat a new XMLHttpRequest
    var request = new XMLHttpRequest();
    //open the request, tell it what method we want to use
    request.open("GET", url);
    //set the callback we want it to run when complete
    request.onload = callback;
    //send the request
    request.send();
  };

  var requestComplete = function(){
    
    if (this.status !== 200) return;

    var jsonString = this.responseText;
    point = JSON.parse(jsonString);
    heatMapData.push(pointToLatLng(point));
    //console.log(heatMapData);
    
    
  };

  var pointToLatLng = function(point){
    console.log(point);
    return {location: new google.maps.LatLng(point.location.latitude,point.location.longitude), weight: point.data}

  };


  map = new MapWrapper(div, {lat: 40.7, lng: -74.2}, zoomLevel);


  makeRequest(  "http://api.openweathermap.org/v3/uvi/40.7,-74.2/current.json?appid=29fa680d5253a0d0a26c7743e70b5bcf", requestComplete);
  makeRequest( "http://api.openweathermap.org/v3/uvi/25,-80/current.json?appid=29fa680d5253a0d0a26c7743e70b5bcf", requestComplete);

  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData    
  });

  heatmap.setMap(map.googleMap);








}


window.onload = app;