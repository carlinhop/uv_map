var app = function(){

  var heatMapData = [];
  var div = document.getElementById("main-map");
  var index = document.getElementById("index");
  var time = document.getElementById("time");
  var coordinates = document.getElementById("coordinates");
  var zoomLevel = 10;
  //Here I was trying to match the actual colors of the UV scale
  // var colors = [
  //         '#008000',
  //         '#FFFF00',
  //         '#FFA500',
  //         '#FF0000',
  //         '#800080'
  //       ]
  //var colors = ["green", "yellow", "orange", "red", "violet" ]

//This function takes a API data point and converts it to a google maps weighted location for the heatmap
  var pointToLatLng = function(point){
    
    return {location: new google.maps.LatLng(point.location.latitude,point.location.longitude), weight: point.data}

  };


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

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatMapData    
    });

    heatmap.setMap(map.googleMap);

    //heatmap.set("gradient", colors);

    index.innerText = point.data
    time.innerText = point.time
    coordinates.innerText = (point.location.latitude+ ", " +point.location.longitude)
    console.log(point);
    
    
  };




  map = new MapWrapper(div, {lat: 40.7, lng: -74.2}, zoomLevel);

  map.googleMap.addListener("click", function(e){
  
   var geoPointLat = e.latLng.lat().toFixed(1); 
   var geoPointLng = e.latLng.lng().toFixed(1);

    makeRequest(  "http://api.openweathermap.org/v3/uvi/"+geoPointLat+","+geoPointLng+"/current.json?appid=29fa680d5253a0d0a26c7743e70b5bcf", requestComplete);




  });










}


window.onload = app;