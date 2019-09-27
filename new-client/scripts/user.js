function register() {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/register',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    }
  })
    .done(payload => {
      $.toast('Registration success')
      localStorage.setItem('token', payload.token)
      checkToken()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })
}

function login() {
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/login',
    data: {
      email: $('#email').val(),
      password: $('#password').val()
    }
  })
    .done(payload => {
      $.toast('Login success')
      localStorage.setItem('token', payload.token)
      checkToken()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })
}

function logout() {
  $('#logout-btn').click(function () {
    localStorage.removeItem('token')
    $.toast('Good bye!')
    navigate(['#login-page', '#start', '.nav-button'])
  })
}