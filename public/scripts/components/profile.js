$(()=>{
  window.$profile = $(`
  <div id='profile'>
    <h5></h5>
    <ul></ul>
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

const renderProfile = (data, name) => {
  $profile.children('h5').text(name);
};

const loadProfile = (id, name) => {
  getUserProfile(id)
    .then(data => renderProfile(data, name));
  window.views_manager.show('$profile');
};
