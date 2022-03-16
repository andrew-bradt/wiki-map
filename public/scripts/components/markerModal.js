$(() => {

  const createModal = function (marker, isEdit) {
    return `
    <div class='card shadow p-3 mb-5 rounded' id='markerModal'>
    <img class='card-img-top' src='${marker.img_url}' onerror="this.src='https://www.seekpng.com/png/detail/212-2120621_travel-places-emoticons-place-icon-png.png'">
    <div class='card-body'>
    <form class='infoDisplay'>
    <input type="hidden" name="id" value="${marker.id}">
    <div class="form-group">
      <label for="title" class="col-form-label text-secondary">Title</label>
      <div>
        <input required type="text" ${isEdit ? `` : `readonly`} class="form-control-plaintext border border-primary rounded" id="title" name="titel" value='${marker.title}'>
      </div>
    </div>
    <div class="form-group">
      <label for="description" class="col-form-label text-secondary">Description</label>
      <div>
        <textarea type="text" ${isEdit ? `` : `readonly`} class="form-control-plaintext  border border-primary rounded" rows='2' id="description" name="description">${marker.description}</textarea>
      </div>
      ${isEdit ?
        `</div>
          <div class="form-group">
            <label for="img_url" class="col-form-label text-secondary">Image url</label>
            <div>
              <input type="text" class="form-control-plaintext border border-primary rounded" id="img_url" name="img_url" value='${marker.img_url}'>
            </div>
          </div>
          <div class="form-group">
            <label for="icon_img_url" class="col-form-label text-secondary">Icon Image url</label>
            <div>
              <input type="text" class="form-control-plaintext  border border-primary rounded" id="icon_img_url" name="icon_img_url" value='${marker.icon_img_url}'>
            </div>
          </div>
        <button type='submit' class='btn btn-primary btn-block'>Save changes</button>`
        : ``}
    </form>
    ${isEdit ?
        `<form class='deleteMarker'>
        <input type="hidden" name="id" value="${marker.id}">
        <button type='submit' class='btn btn-secondary btn-block'>Delete marker</button>
        </form>`
        : ``}
    </div>
    </div>
    `;
  };

  // Store in window to allow access globally
  window.createModal = createModal;

  // Actions when submitting form elements
  // submit changes
  $('body').on('submit', '.infoDisplay', function (event) {
    event.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      method: "PUT",
      url: `/api/markers`, // id will be included inside data
      data
    }).then(() => {
      existModal(event);
    });

  });

  // Delete marker
  $('body').on('submit', '.deleteMarker', function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    $.ajax({
      method: "DELETE",
      url: `/api/markers`, // id will be included inside data
      data
    }).then(() => {
      existModal(event);

      // delete marker on map
      markerShown.setMap(null);
    });

  });


});
