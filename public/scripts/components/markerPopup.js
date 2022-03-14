$(() => {

  const createPopup = function (marker, isEdit) {
    return `
    <div class='card'>
    <img class='card-img-top' src='${marker.img_url}'>
    <div class='card-body'>
    <form class='infoDisplay'>
    <input type="hidden" name="id" value="${marker.id}">
    <div class="form-group">
      <label for="title" class="col-form-label text-secondary">Title</label>
      <div>
        <input type="text" ${isEdit ? `` : `readonly`} class="form-control-plaintext" id="title" name="titel" value='${marker.title}'>
      </div>
    </div>
    <div class="form-group">
      <label for="description" class="col-form-label text-secondary">Description</label>
      <div>
        <input type="text" ${isEdit ? `` : `readonly`} class="form-control-plaintext" id="description" name="description" value='${marker.description}'>
      </div>
      ${isEdit ?
        `</div>
          <div class="form-group">
            <label for="img_url" class="col-form-label text-secondary">Image url</label>
            <div>
              <input type="text" class="form-control-plaintext" id="img_url" name="img_url" value='${marker.img_url}'>
            </div>
          </div>
          <div class="form-group">
            <label for="icon_img_url" class="col-form-label text-secondary">Icon Image url</label>
            <div>
              <input type="text" class="form-control-plaintext" id="icon_img_url" name="icon_img_url" value='${marker.icon_img_url}'>
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
  window.createPopup = createPopup;

  // test marker
  const marker = {
    id: 1,
    title: 'Pizza Nova',
    description: 'quick and easy',
    img_url: 'https://lh5.googleusercontent.com/p/AF1QipOqrdfgkc1dcj6XruqiT09zf1vD1Nd5MvxGfz3H=w408-h306-k-no',
    icon_img_url: 'https://icons.iconarchive.com/icons/sonya/swarm/64/Pizza-icon.png'
  };

  window.$popUp = $(createPopup(marker, true));
  // end of test

  // Actions when submitting form elements
  // submit changes
  $('body').on('submit', '.infoDisplay', function (event) {
    event.preventDefault();

    // check if title is empty
    if (!$('#title').val()) {

      alert('Title cannot be empty!');
      return;
    }
    
    const data = $(this).serialize();

    $.ajax({
      method: "PUT",
      url: `/api/markers`, // id will be included inside data
      data
    });

  });

  // Delete marker
  $('body').on('submit', '.deleteMarker', function (event) {
    event.preventDefault();

    const data = $(this).serialize();
    console.log(data);
    $.ajax({
      method: "DELETE",
      url: `/api/markers`, // id will be included inside data
      data
    });
  });


});
