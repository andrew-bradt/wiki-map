let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: {lat: 42, lng: -83}
  });
};
