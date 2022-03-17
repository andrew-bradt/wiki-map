$(()=>{
  window.$profile = $(`
  <div id='profile' class='container-fluid d-flex-column justify-content-center'>
      <h4></h4>
      <img alt='profile-pic' src='https://storage.needpix.com/rsynced_images/profile-2398782_1280.png'></img>
      <div></div>
  </div>`);
});

const getUserProfile = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/profiles/${id}`
  }).then(res => {
    return res;
  });
};

const renderProfile = (mapInfo, name) => {
  const {ownFavorite, owns, favorites} = mapInfo;

  $profile.children().first('h4').text(name);
  const $listContainer = $profile.children('div');
  $listContainer.empty();

  renderSection({
    label: 'User Maps',
    mapLists: [ownFavorite, owns]
  }, $listContainer);

  renderSection({
    label: 'Favorite Maps',
    mapLists: [ownFavorite, favorites]
  }, $listContainer);
};

const renderMapList = (mapList) => {

  if (!mapList.length) return;

  const $mapList = mapList.map(map => {
    const {id, title, description, img_url} = map;
    const $li = $('<li class="card-body container bg-light mt-3"></li>');
    const $img = $(`<img class='card-img-top' src='${img_url}'></img>`);
    const $title = $(`<h5>${title}</h5>`);
    const $description = (description) ? $(`<p>${description}</p>`) : '';
    const $button = $(`<button class="btn btn-primary">Check out this map</button>`);
    $button.on('click', () => {
      loadMap(id);
    });
    return $li.append($img, $title, $description, $button);
  });

  return $mapList;
};

const renderSection = (options, $parentEl) => {
  const {label, mapLists} = options;
  const $mapLists = mapLists.map(maps => renderMapList(maps)).flat();

  if (!$mapLists) return;
  const $mapSection = $(`
    <section>${label}</section>
  `);

  $mapSection.append($mapLists);
  $parentEl.append($mapSection);
};

const loadProfile = (id, name) => {
  getUserProfile(id)
    .then(data => renderProfile(data, name));
  window.views_manager.show('$profile');
};
