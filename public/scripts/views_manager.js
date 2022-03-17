$(()=>{
  window.$root = $('#root');

  window.views_manager = {};

  // Only invoke this method when the user first visits the app inside app.js
  window.views_manager.load = function(user) {
    $map.detach();
  };

  // Invoke when component should be swapped with the component jQueryDOM Element
  window.views_manager.show = function(component) {
    $root.children().detach();
    $searchBar.detach();
    hideMapTitleNav();

    switch (component) {
    case '$map':
      $map.appendTo($root);
      $favButton.appendTo($root);
      checkIfFavor(mapInfo.id).then(res => {
        favButtonSwitchState(res);
      });
      break;
    case '$maps':
      $mapsList.appendTo($root);
      $searchBar.appendTo($('header'));
      break;
    case '$profiles':
      $profiles.appendTo($root);
      break;
    case '$profile':
      $profile.appendTo($root);
      break;
    case '$mapCreateModal':
      $mapCreateModal.appendTo($root);
      break;
    }
  };
});
