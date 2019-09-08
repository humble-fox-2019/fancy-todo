$(document).ready(() => {
    checkSignedIn()
    showRegister()
    showLogin()
})

function showRegister() {
    removeErrors()
    $('#showRegister').click(() => {
        $('#loginModal').modal('hide')
        $('#registerModal').modal({ backdrop: 'static', keyboard: false })
    })
}

function showLogin() {
    removeErrors()
    $('#backtoLogin').click(() => {
        $('#registerModal').modal('hide')
        $('#loginModal').modal({ backdrop: 'static', keyboard: false })
    })
}

function register() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/users/register",
        data: {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
        .done((payload) => {
            localStorage.setItem('token', payload.token)
            removeErrors()
            checkSignedIn()
        })
        .fail(err => {
            removeErrors()
            let error = err.responseJSON.join('<br>')
            $('#register-modal .modal-body').prepend(`<div class="alert alert-danger" role = "alert" >
                        ${error}
                    </div >`)

        })
}

function checkSignedIn() {
    if (localStorage.getItem('token')) {
        $('#loginModal').modal('hide')
        $('#registerModal').modal('hide')
    } else {
        $('#loginModal').modal({ backdrop: 'static', keyboard: false })
    }
}

function login() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/users/login",
        data: {
            identifier: $('#identifier').val(),
            password: $('#passwordLogin').val()
        }
    })
        .done((payload) => {
            localStorage.setItem('token', payload.token)
            $('#identifier').val('')
            $('#passwordLogin').val('')
            checkSignedIn()
            removeErrors()
        })
        .fail(err => {
            removeErrors()
            $('#login-modal .modal-body').prepend(`<div class="alert alert-danger" role = "alert" >
                        ${err.responseJSON}
                    </div >`)
        })
}

function onSignIn(googleUser) {
    const id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/users/googlesignin",
        data: { "token": id_token }
    })
        .done((payload) => {
            console.log("Success login")
            localStorage.setItem('token', payload.token)
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => console.log("Ajax process done"));
}