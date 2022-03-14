$(() => {

  const createPopup = function(marker, isEdit) {
    return `
    <div class='card'>
    <img class='card-img-top' src='${marker.img_url}'>
    <div class='card-body'>
    <form class='infoDisplay'>
    <input type="hidden" name="id" value="${marker.id}">
    <div class="form-group">
      <label for="title" class="col-form-label">Title</label>
      <div>
        <input type="text" readonly class="form-control-plaintext" id="title" name="titel" value='${marker.title}'>
      </div>
    </div>
    <div class="form-group">
      <label for="description" class="col-form-label">Description</label>
      <div>
        <input type="text" readonly class="form-control-plaintext" id="description" name="description" value='${marker.description}'>
      </div>
    </div>
    <div class="form-group hidden">
      <label for="img_url" class="col-form-label">Image url</label>
      <div>
        <input type="text" readonly class="form-control-plaintext" id="img_url" name="img_url" value='${marker.img_url}'>
      </div>
    </div>
    <div class="form-group hidden">
      <label for="icon_img_url" class="col-form-label">Icon Image url</label>
      <div>
        <input type="text" readonly class="form-control-plaintext" id="icon_img_url" name="icon_img_url" value='${marker.icon_img_url}'>
      </div>
    </div>
    ${isEdit ?
        `<button type='submit'>Save changes</button>`
        : ``}
    </form>
    ${isEdit ?
        `<form class='deleteMarker'>
        <input type="hidden" name="id" value="${marker.id}">
        <button type='submit'>Delete marker</button>
        </form>`
        : ``}
    </div>
    </div>
    `;
  };

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
  $('body').on('submit', '.infoDisplay', function(event) {
    event.preventDefault();

    const data = $(this).serialize();

    $.ajax({
      method: "PUT",
      url: `/markers`, // id will be included inside data
      data
    });
  });

  // Delete marker
  $('body').on('submit', '.deleteMarker', function(event) {
    event.preventDefault();

    const data = $(this).serialize();
    console.log(data);
    $.ajax({
      method: "DELETE",
      url: `/markers`, // id will be included inside data
      data
    });
  });


});
