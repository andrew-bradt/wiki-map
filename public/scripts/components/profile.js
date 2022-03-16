$(()=>{
  window.$profile = $(`<div id='profile'></div>`);
});

const getProfile = (id) => {
  return $.ajax({
    type: 'GET',
    url: `/api/profiles/${id}`
  }).then(res => console.log(res));
};
