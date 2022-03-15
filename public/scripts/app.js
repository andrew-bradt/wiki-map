$(()=>{
  views_manager.load();
  getAllMaps().then(function( json ) {
    mapsList.addMapsList(json);
    console.log(json);
    views_manager.show('maps');
  });
});
