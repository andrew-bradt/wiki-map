$(()=>{
  window.$nav = $(`header.navbar`);



});

const changeMapTitleNav = (title) => {
  $('.nav-item')[1].textContent = title;
};
