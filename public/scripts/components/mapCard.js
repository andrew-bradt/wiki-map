$(() => {

  const createMapCard = function (map) {
    return `
    <div class="card mapCard">
    <img class="card-img-top" src="" alt="Card image cap">
    <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Check out this map</a>
    </div>
    </div>
    `;
  };

  window.mapsList.createMapCard = createMapCard;

});
