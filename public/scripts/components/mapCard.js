$(() => {
  window.mapsList.createMapCard = createMapCard;

  $('main').on('click', '.checkOutMap', function() {
    const mapId = $(this).data('id');
    const mapTitle = $(this).siblings('h5').text();
    loadMap(mapId, mapTitle);
  });
});

const createMapCard = function (map) {
  return `
  <div class="card mapCard">
  <img class="card-img-top" src="${map.img_url}" onerror="this.src='https://i.pinimg.com/originals/73/11/61/731161a7c8d5374b0fed6fcb43875c87.png'">
  <div class="card-body">
  <h5 class="card-title">${map.title}</h5>
  <p class="card-text">${map.description}</p>
  <button class="btn btn-primary checkOutMap" data-id='${map.id}'>Check out this map</button>
  </div>
  </div>
  `;
};
