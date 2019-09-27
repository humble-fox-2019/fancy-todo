function onSignIn(googleUser) {
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    method: 'POST',
    url: 'http://35.185.188.15/users/login/google',
    headers: { id_token }
  })
    .done(data => {
      localStorage.setItem('token', data.token)
      checkToken()
    })
    .fail(err => {
      console.log(err)
    })
}

function signOut() {
  var auth2 = gapi.auth2.getAuthInstance()
  auth2.signOut().then(function () {
    // localStorage.removeItem('token')
    console.log('User signed out.')
  });
}