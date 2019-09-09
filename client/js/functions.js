function hideAll() {
    $('#home').hide()
    $('#landing').hide()
    $('#login').hide()
    $('#register').hide()
}

//google sign in
function onSignIn(googleUser) {

    const id_token = googleUser.getAuthResponse().id_token;

    $.ajax({
            method: "post",
            url: 'http://localhost:3000/user/googleSignIn',
            headers: {
                id_token
            },
        })
        .done(data => {
            resetLogin()
            localStorage.setItem("token", data.token)
            hideAll()
            $('#home').show()
        })
        .fail(err => {
            resetLogin()
            Swal.fire({
                type: 'error',
                text: err.responseJSON.message
            })
        })

}

//reset login form
function resetLogin() {
    $('#login-email').val("")
    $('#login-password').val("")
}

//reset register form
function resetRegister() {
    $('#reg-name').val("")
    $('#reg-email').val("")
    $('#reg-password').val("")
}