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
  $.ajax({
    type: 'GET',
    url: `/api/map/${map_id}`
  }).then(res => {
    return res;
  }).catch(err=>{
    console.log(err.message);
  });
};
