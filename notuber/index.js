// source: google api!
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.352271, lng: -71.05524200000001 },
    zoom: 14,
  });
  const locations = [
    ['mXfkjrFw', 42.3453, -71.0464],
    ['nZXB8ZHz',42.3662, -71.0621],
    ['Tkwu74WC', 42.3603, -71.0547],
    ['5KWpnAJN',42.3472, -71.0802],
    ['uf5ZrXYw', 42.3663, -71.0544],
    ['VMerzMH8', 42.3542, -71.0704]
  ]

  for (var i = 0; i < locations.length; i++) { 
    const imageDriver = 'marker.png';
    const DriverLatLng = new google.maps.LatLng(locations[i][1], locations[i][2]);
    const driverMarker = new google.maps.Marker({
        position: DriverLatLng,
        map: map,
        icon: imageDriver,
        })    
    }

}



window.initMap = initMap;
