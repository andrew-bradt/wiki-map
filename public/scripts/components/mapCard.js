$(() => {

  const createMapCard = function (map) {
    return `
    <div class="card mapCard">
    <img class="card-img-top" src="${map.img_url}" alt="Card image cap">
    <div class="card-body">
    <input type="hidden" value="${map.id}">
    <h5 class="card-title">${map.title}</h5>
    <p class="card-text">${map.description}</p>
    <button class="btn btn-primary checkOutMap">Check out this map</button>
    </div>
    </div>
    `;
  };

  window.mapsList.createMapCard = createMapCard;

  $('main').on('click', '.checkOutMap', function() {

    const mapId = $(this).siblings('input').val();
    loadMap(mapId);

  });

});
