$(()=>{
  window.$profiles = $(`
    <div id = 'profiles'>
      <ul class="lsit-group"></ul>
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
  parentEl.empty();
  const profileEls = profiles.map(profile => {
    const {id, name} = profile;
    const el = $(`
      <li class="list-group-item list-group-item-action list-group-item-primary">
        <a>${name}</a>
      </li>
    `);
    el.on('click', () => {
      loadProfile(id, name);
    });
    return el;
  });
  parentEl.append(profileEls);
};
