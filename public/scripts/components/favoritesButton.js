window.$favButton = $(`
<button type="button" class="btn btn-outline-danger" id="favButton">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>
</button>
`);

$(() => {

  // set favorite when clicked while outline button showing
  $('body').on('click', '.btn-outline-danger', function() {
    const data = { map_id: mapInfo.id};
    $.ajax({
      type: 'POST',
      url: '/favorites',
      data
    }).then(() => {
      $favButton.removeClass('btn-outline-danger');
      $favButton.addClass('btn-danger');
    });
  });

  // unfavorite when clicked while solid button showing
  $('body').on('click', '.btn-danger', function() {
    const data = { map_id: mapInfo.id};
    $.ajax({
      type: 'DELETE',
      url: '/favorites',
      data
    }).then(() => {
      $favButton.removeClass('btn-danger');
      $favButton.addClass('btn-outline-danger');
    });
  });

});
