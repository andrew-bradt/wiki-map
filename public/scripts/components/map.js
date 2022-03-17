// Add Components to window and then define methods for that component

// Assigning functions to window object is unnecessary unless your function is referring to DOM elements outside of function scope
$(() => {
  window.$map = $('#map');
});

const addMarker = (coords) => {
  const marker = new google.maps.Marker({
    position: coords,
    map
  });

  // for deleting new markers that just created
  window.markerShown = marker;

  marker.addListener('click', () => {
    window.markerShown = marker;
    renderModal(coords);
  });

  marker.setMap(map);
  markers.push(marker);

};

const removeMarkers = () => {
  markers.forEach(marker => marker.setMap(null));
  markers = [];
};

const sendMarkerData = (data) => {
  return $.ajax({
    type: 'POST',
    url: '/api/markers',
    data,
    success: function () {
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
    const { lat, lng } = marker;
    addMarker({ lat, lng });
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

const loadMap = (id, mapTitle) => {
  removeMarkers();
  getMarkers(id)
    .then(data => {
      renderMarkers(data);
      const center = getCenter(data);
      map.setCenter(center);
      mapInfo.id = id;
      window.views_manager.show('$map');
      changeMapTitleNav(`Current Map: ${mapTitle}`);
    });
};

const createMap = (data) => {
  removeMarkers();
  // render create map modal
  views_manager.show('$mapCreateModal');
};

const renderModal = function (coords) {
  $.ajax({
    type: 'GET',
    url: `/api/markers/${coords.lat}/${coords.lng}`
  })
    .then(res => {
      const markerInfo = res[0] || {};
      window.$markerModal = $(createModal(markerInfo, true));
      $markerModal.appendTo($root);
      $markerModal.hide();
      $markerModal.slideDown();

      document.querySelector('#map').addEventListener('click', exitModal, true);
    });
};

const exitModal = function (e) {
  const mapArea = document.querySelector('#map');
  $markerModal.slideUp(300, () => {
    $markerModal.detach();
    mapArea.removeEventListener('click', exitModal, true);
    mapArea.removeEventListener('click', exitModal, false);
  });
  e.stopPropagation();
};
