$(()=>{
  setTimeout(() => {
    views_manager.load();
  }, 1000);
  getAllMaps().then(function(json) {
    mapsList.addMapsList(json);
    views_manager.show('$maps');
  });
});
