window.$favButton = $(`
<button type="button" class="btn btn-outline-danger" id="favButton">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
</button>
`);

// function to switch the state of favButton, pass truthy value to switch to can be pressed, falsy value to switch to unpressed
const favButtonSwitchState = function (state) {
  if (state) {
    $favButton.removeClass('btn-outline-danger').addClass('btn-danger');
    return;
  }
  $favButton.removeClass('btn-danger').addClass('btn-outline-danger');
};

// function to check if user has already favored this map, used for when loading map
const checkIfFavor = function (map_id) {
  return $.ajax({
    type: 'GET',
    url: `/favorites/${map_id}`
  }).then(res => {
    return res.length;
  });
};


$(() => {

  // set favorite when clicked while outline button showing
  $('body').on('click', '.btn-outline-danger', function () {
    const data = { map_id: mapInfo.id };
    $.ajax({
      type: 'POST',
      url: '/favorites',
      data
    }).then(() => {
      favButtonSwitchState(1);
    });
  });

  // unfavorite when clicked while solid button showing
  $('body').on('click', '.btn-danger', function () {
    const data = { map_id: mapInfo.id };
    $.ajax({
      type: 'DELETE',
      url: '/favorites',
      data
    }).then(() => {
      favButtonSwitchState(0);
    });
  });

});
