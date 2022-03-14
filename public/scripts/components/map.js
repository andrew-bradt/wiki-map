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
