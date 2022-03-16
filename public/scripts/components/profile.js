$(()=>{
  window.$profile = $(`
  <div id='profile'>
      <h5></h5>
      <img alt='profile-pic'></img>
      <h5>User Maps:</h5>
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
  $profile.children().first('h5').text(name);
  const mapList = mapInfo.map(map => {
    const {id, title, description} = map;
    return (
      `
      <li>
        <div>
          <h5><a>${title}</a></h5>
          ${(description) ? `<p>${description}</p>` : ''}
        </div>
      </li>
      `
    );
  });
  $profile.children('ul').append(mapList);
};

const loadProfile = (id, name) => {
  getUserProfile(id)
    .then(data => renderProfile(data, name));
  window.views_manager.show('$profile');
};
