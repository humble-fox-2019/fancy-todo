function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        $('nav').hide()
        $('.box-login').show()
        $('.box-regis').hide()
        $('.box-todos').hide()
        $('.box-cardList').hide()
        $('.box-password').hide()
        $('.box-edit-profile').hide()
        $('.box-cardList').empty()
        console.log('User signed out.');
    });
}