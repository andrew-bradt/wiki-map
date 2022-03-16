$(()=>{
  window.$profile = $(`
  <div id='profile'>
      <h4></h4>
      <img alt='profile-pic'></img>
      <h4>User Maps:</h4>
      <ul></ul>
  </div>`);
});

const getUserProfile = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/profiles/${id}`
  }).then(res => {
    console.log(res);
    return res;
  });
};

const renderProfile = (mapInfo, name) => {
  $profile.children().first('h4').text(name);
  const $mapList = renderMapList(mapInfo);
  $profile.children('ul').append($mapList);
};

const renderMapList = (mapInfo) => {
  const $mapList = mapInfo.map(map => {
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

const loadProfile = (id, name) => {
  getUserProfile(id)
    .then(data => renderProfile(data, name));
  window.views_manager.show('$profile');
};
