$(()=>{
  window.$profile = $(`
  <div id='profile'>
      <h4></h4>
      <img alt='profile-pic'></img>
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
    label: 'My Maps',
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
    const {id, title, description} = map;
    const $li = $('<li></li>');
    const $title = $(`<h5><a>${title}</a></h5>`);
    const $description = (description) ? $(`<p>${description}</p>`) : '';

    $title.on('click', () => {
      loadMap(id);
    });
    return $li.append($title, $description);
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
