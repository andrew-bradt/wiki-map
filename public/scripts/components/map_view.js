// Initialize and add the map
const dbResult = {
  markers: [
    {
      lat: 41,
      lng: -80
    },
    {
      lat: 40,
      lng: -83
    },
    {
      lat: 43,
      lng: -82.9
    }
  ],
  center: {
    lat:42,
    lng:-82
  }
};
const markerPositions = [

];

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: {lat: 42, lng: -83}
  });
};

function rerender (data) {
  const {markers, center} = data;
  markers.map(addMarker);
  map.setCenter(center);
};

function addMarker (coords) {
  const marker = new google.maps.Marker({
    position: coords,
    map
  });
};

$(()=>{
  rerender(dbResult);
});


