$(()=>{
  window.$root = $('#root');

  window.views_manager = {};

  // Only invoke this method when the user first visits the app inside app.js
  window.views_manager.load = function (user) {
    $map.detach();
  };

  // Invoke when component should be swapped with the component jQueryDOM Element
  window.views_manager.show = function (component) {
    $map.detach();
    $mapsList.detach();

    switch (component) {
    case '$map':
      $map.appendTo($root);
      break;
    case '$maps':
      $mapsList.appendTo($root);
      break;
    }
  };
});
