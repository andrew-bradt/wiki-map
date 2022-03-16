$(()=>{
  window.$profiles = $(`
    <div id = 'profiles'>
      <ul></ul>
    </div>
  `);
});

const getProfiles = () => {
  return $.ajax({
    type: 'GET',
    url: '/api/profiles'
  }).then(res => console.log(res));
};

const getProfile = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/profiles/${id}`
  }).then(res => console.log(res));
};

const loadProfiles = () => {
  window.views_manager.show('$profiles');
};
