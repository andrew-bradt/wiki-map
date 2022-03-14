// Add Components to window and then define methods for that component

// Assigning functions to window object is unnecessary unless your function is referring to DOM elements outside of function scope
$(()=>{
  window.$map = $('#map');
});

const addMarker = (coords) => {
  new google.maps.Marker({
    position: coords,
    map
  });
};

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
    const lat = Number(marker.lat);
    const lng = Number(marker.lng);
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
};

// getMarkers(1).then(data => console.log(getCenter(data)));
