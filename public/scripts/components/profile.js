$(()=>{
  window.$profile = $(`<div id='profile'>A single profile will show up here.</div>`);
});

const getUserMaps = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/profiles/${id}`
  }).then(res => console.log(res));
};

const loadProfile = (id) => {
  getUserMaps(id);
  window.views_manager.show('$profile');
};