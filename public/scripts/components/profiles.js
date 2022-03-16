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
  }).then(res => {
    return res;
  });
};

const getProfile = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/profiles/${id}`
  }).then(res => console.log(res));
};

const loadProfiles = () => {
  getProfiles()
    .then(res => renderProfiles(res, $profiles.children('ul')));
  window.views_manager.show('$profiles');
};

const renderProfiles = (profiles, parentEl) => {
  const profileEls = profiles.map(profile => {
    const {id, name} = profile;
    const el = $(`<li key=${id}>${name}</li>`);
    el.on('click', (e) => getProfile(e.target.key));
    return el;
  });
  parentEl.append(profileEls);
};
