$(() => {

  // set up container for maps
  const $mapsList = $(`
    <section class="maps-list">
    <p>Loading maps</p>
    </section>
  `);

  window.$mapsList = $mapsList;
  window.mapsList = {};

  const addMaps = function(map) {
    $mapsList.append(map);
  };

  const clearMaps = function() {
    $mapsList.empty();
  };

  window.mapsList.clearMaps = clearMaps;

  const addMapsList = function(maps) {
    clearMaps();
    for (const mapId in maps) {
      const map = maps[mapId];
      const mapCard = mapsList.createMapCard(map);
      addMaps(mapCard);
    }
  };
  window.mapsList.addMapsList = addMapsList;

});

const getAllMaps = function(params) {
  let url = 'api/map';
  if (params) {
    url += '?' + params;
  }
  return $.ajax({
    url,
  });
};
