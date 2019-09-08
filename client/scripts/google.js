function onSignIn(googleUser) {
  // const profile = googleUser.getBasicProfile()
  const id_token = googleUser.getAuthResponse().id_token
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/user/login/google',
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