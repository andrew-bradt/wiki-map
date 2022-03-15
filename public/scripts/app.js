$(()=>{
  views_manager.load();
  getAllMaps().then(function( json ) {
    mapsList.addMapsList(json);
    views_manager.show('$maps');
  });
});
