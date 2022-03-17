const $searchBar = $(`
<form class="searchBar form-inline my-2 my-lg-0">
  <input class="form-control mr-sm-2" type="search" placeholder="Search maps by title" aria-label="Search" name="searchTitle">
</form>
`);

$(() => {
  $('header').on('submit', '.searchBar', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    getAllMaps(data).then(function( json ) {
      mapsList.addMapsList(json);
      views_manager.show('$maps');
    });
  });
});
