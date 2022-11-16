// source: google api!
let map;


function initMap() {
  let myLat;
  let myLng;
  let cars;
  let data;
  let yourMarker;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.352271, lng: -71.05524200000001 },
    zoom: 14,
  });

  getMyLocation();

  function getMyLocation() {
    if (navigator.geolocation) {  
  
      navigator.geolocation.getCurrentPosition(function(position) {
        myLat = position.coords.latitude;
        myLng = position.coords.longitude;
        var yourImage = {url:'images/yourpin.png', scaledSize: new google.maps.Size(27.52, 48)}
        const myLatLng = new google.maps.LatLng(myLat, myLng);
        yourMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: yourImage
            });
          
        map.panTo(myLatLng);
        getCars();
        })
    }
    else {
      alert("Geolocation is not supported by your web browser!");
    }
  }
  
  function getCars(){
  
    // "username=lZzlNkup&lat=YOUR_LATITUDE&lng=YOUR_LONGITUDE"
    var http = new XMLHttpRequest();
    var url = 'https://arcane-crag-89041.herokuapp.com/rides';
    var params = "username=lZzlNkup&lat="+myLat+"&lng="+myLng;
    http.open('POST', url, true);

  
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  
    http.onreadystatechange = function() {//Call a function when the state changes.

        if(http.readyState == 4 && http.status == 200) {
          stateChanged=true;
          cars = http.responseText;
          data = JSON.parse(cars)
          showCars();
        }
    }
    http.send(params, true);
  }


  function showCars(){

    const locations = {};
    const distances = {};
    let myLatLng;

    for (let step = 0; step<data.length;step++){
      let temp =[];
      // temp.push(data[step].id);
      temp.push(data[step].lat);
      temp.push(data[step].lng);
      ids = String(data[step].id)
      locations[ids] = temp;
    }

    for (var key in locations){
      const imageDriver = 'images/carmarker.png';
      const DriverLatLng = new google.maps.LatLng(locations[key][0], locations[key][1]);

      const myLatLng = new google.maps.LatLng(myLat, myLng);

      distances[key] = google.maps.geometry.spherical.computeDistanceBetween(myLatLng, DriverLatLng)*0.000621371192;

      const driverMarker = new google.maps.Marker({
          position: DriverLatLng,
          map: map,
          icon: imageDriver,
          })
    }

    var items = Object.keys(distances).map(function(key) {
      return [key, distances[key]];
    });
    items.sort(function(first, second) {
      return second[1] - first[1];
    });

    const closest = items.pop();
      
    const contentString = "Your closest car is " + closest[1] + " miles away!"
    // const contentString = "<div> Your closest car is "+closest[1]+" miles away!"+"<br><input type='submit' id='butSubmit' value='Refresh cars!' onclick='getCars()'></div>"
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
      ariaLabel: "Uluru",
    });

    yourMarker.addListener("click", () => {
      infowindow.open({
        anchor: yourMarker,
        map,
      });
    });

    var flightPlanCoordinates = [{lat:myLat, lng:myLng}, {lat:locations[closest[0]][0], lng:locations[closest[0]][1]}]
    var flightPath = new google.maps.Polyline({
      path: flightPlanCoordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
      });
     
     flightPath.setMap(map);

     setTimeout(getCars, 45000)

  }
}



window.initMap = initMap;
