$(()=>{
  window.$profiles = $(`
    <div id = 'profiles'>
      <ul></ul>
    </div>
  `);
});

const getProfiles = () => {
  return $.ajax({
    type: 'GET',
    url: '/api/profiles'
  }).then(res => console.log(res));
};
