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

const loadProfiles = () => {
  getProfiles()
    .then(res => renderProfiles(res, $profiles.children('ul')));
  window.views_manager.show('$profiles');
};

const renderProfiles = (profiles, parentEl) => {
  const profileEls = profiles.map(profile => {
    const {id, name} = profile;
    const el = $(`
      <li>
        <a>${name}</a>
      </li>
    `);
    el.on('click', () => {
      getProfile(id);
    });
    return el;
  });
  parentEl.append(profileEls);
};
