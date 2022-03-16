const getProfiles = () => {
  return $.ajax({
    type: 'GET',
    url: '/api/profiles'
  }).then(res => console.log(res));
};
