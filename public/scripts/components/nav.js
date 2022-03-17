$(()=>{
  window.$nav = $(`header.navbar`);
});

const changeMapTitleNav = (title) => {
  const mapTitle = $(`.nav-item`)[1];
  const $mapTitle = $(mapTitle);
  $mapTitle.text(title);
  $mapTitle.show();
};

const hideMapTitleNav = () => {
  const mapTitle = $(`.nav-item`)[1];
  $(mapTitle).hide();
};
