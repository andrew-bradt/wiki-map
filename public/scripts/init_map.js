let map;
let markers = [];

const mapInfo = {
  id: null,
  title: '',
  description: ''
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 42, lng: -83}
  });

  map.addListener('click', (e)=>{
    const coords = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    addMarker(coords);
    sendMarkerData(coords);
  });
};
