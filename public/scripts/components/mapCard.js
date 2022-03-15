$(() => {

  const createMapCard = function (map) {
    return `
    <div class="card mapCard">
    <img class="card-img-top" src="${map.img_url}" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">${map.title}</h5>
    <p class="card-text">${map.description}</p>
    <a href="#" class="btn btn-primary">Check out this map</a>
    </div>
    </div>
    `;
  };

  window.mapsList.createMapCard = createMapCard;

});
