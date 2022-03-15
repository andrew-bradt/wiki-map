// Add Components to window and then define methods for that component

// Assigning functions to window object is unnecessary unless your function is referring to DOM elements outside of function scope
$(()=>{
  window.$map = $('#map');

});

const addMarker = (coords) => {
  const marker = new google.maps.Marker({
    position: coords,
    map
  });
  marker.setMap(map);
  markers.push(marker);
};

const removeMarkers = () => markers.forEach(marker => marker.setMap(null));

const sendMarkerData = (data) => {
  $.ajax({
    type: 'POST',
    url: '/api/markers',
    data,
    success: function() {
      console.log('Success');
    }
  });
};

const getMarkers = (map_id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/map/${map_id}`
  });
};

const renderMarkers = (markerData) => {
  markerData.forEach(marker => {
    const {lat, lng} = marker;
    addMarker({lat, lng});
  });
};

const getCenter = (markerData) => {
  const coorSum = markerData.reduce((a, b) => {
    return {
      lat: a.lat + b.lat,
      lng: a.lng + b.lng
    };
  });
  coorSum.lat /= markerData.length;
  coorSum.lng /= markerData.length;
  return coorSum;
};

const loadMap = (id) => {
  getMarkers(id)
    .then(data => {
      renderMarkers(data);
      const center = getCenter(data);
      map.setCenter(center);
    });
  window.views_manager.show('$map');
};


