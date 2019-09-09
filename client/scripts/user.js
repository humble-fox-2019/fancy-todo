function onSignIn(googleUser) {
  const token = googleUser.getAuthResponse().id_token
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/users/signGoogle',
    data: {
      googleToken: token
    }
  })
    .done(function (data) {
      localStorage.setItem('token', data.token);
      $(".beforeLogin").hide()
      $(".afterLogin").show()
      $(".regist").hide()
      $(".signIn").hide()
      $(".signOut").show()
      getAll()
      buttonCreate()
    })
    .fail(err => {
      console.log(err);
    })
}

function register() {
  newClick()
  var name = $("#nameRegister").val();
  var email = $("#emailRegister").val();
  var password = $("#passRegister").val();
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/users/create`,
    data: {
      name: name,
      email: email,
      password: password
    }
  })
    .done(data => {
      $(".erros").hide()
      if (data.errors) {
        data.status = 400
        console.log(data);
        if (data.message.includes('validation failed')) {
          let listError = data.message.split(',').join('.').split('.').join('').split(':')
          let html = ''
          for (let i = 2; i < listError.length; i++) {
            html += `<p>${listError[i]}</p>`
          }
          $(".errors").show()
          $(".errorsList").empty()
          $(".errorsList").append(html)
        }
      } else {
        $('input').val("")
      }
    })
    .fail(function (err) {
      console.log(err)
    })
}
function login() {
  let email = $("#emailSign").val()
  let password = $("#passSign").val()
  $.ajax({
    method: 'POST',
    url: `http://localhost:3000/users/login`,
    data: {
      email: email,
      password: password
    }
  })
  .done(user => {
      newClick()
      $('input').val("")
      localStorage.setItem('token', user.token);
      $(".afterLogin").show()
      $(".signOut").show()
      $(".beforeLogin").hide()
      $(".regist").hide()
      $(".signIn").hide()
      getAll()
      buttonCreate()
    })
    .fail(input => {
      console.log(input);
      $(".errors").show()
      $(".errorsList").empty()
      $(".errorsList").append(
        `<p>${input.status} ${input.statusText}: ${input.responseJSON.message}</p>`)
    })
}
function signOut() {
  newClick()
  if (gapi.auth2) {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut()
      .then(function () {
        localStorage.clear()
        $(".signOut").hide()
        $(".afterLogin").hide()
        $(".beforeLogin").show()
        showRegist()
      })
  }
}
function newClick() {
  $(".errors").hide()
  $(".errorsList").empty()
}
function showRegist() {
  newClick()
  $('.container#register').show()
  $('.container#signin').hide()
}
function manualSign() {
  newClick()
  $('div.container#register').hide()
  $('div.container#signin').show()
}
