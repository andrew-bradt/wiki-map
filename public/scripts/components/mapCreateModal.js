$(() => {

  const mapModal = function (mapInfo, setting) {
    return `
    <div class='card shadow p-3 mb-5 rounded' id='mapCreateModal'>
    <img class='card-img-top' src='${mapInfo.img_url}' onerror="this.src='https://i.pinimg.com/originals/73/11/61/731161a7c8d5374b0fed6fcb43875c87.png'">
    <div class='card-body'>
    <form id=${setting ? 'mapSetting' : 'createMap'}>
    <div class="form-group">
      <label for="title" class="col-form-label text-secondary">Map Title</label>
      <div>
        <input type="text" required class="form-control-plaintext border border-primary rounded" id="title" name="title" value="${mapInfo.title}">
      </div>
    </div>
    <div class="form-group">
      <label for="description" class="col-form-label text-secondary">Map Description</label>
      <div>
        <textarea type="text" class="form-control-plaintext  border border-primary rounded" rows='2' id="description" name="description">${mapInfo.description}</textarea>
      </div>
      <button type="submit" class="btn btn-primary">${setting ? 'Change' : 'Create'}</button>
    </form>
    </div>
    </div>
    `;
  };

  const emptyMap = {title: '', description: ''};
  const $mapCreateModal = $(mapModal(emptyMap, false));

  // Store in window to allow access globally
  window.$mapCreateModal = $mapCreateModal;
  window.mapModal = mapModal;

  // Actions when submitting form elements
  // create map
  $('body').on('submit', '#createMap', function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    $.ajax({
      type: 'POST',
      url: '/api/map',
      data
    }).then(res => {
      mapInfo.id = res.id;
      views_manager.show('$map');
    });
  });

  // change map settings (ie title, description)

});
