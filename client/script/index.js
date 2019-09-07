$(document).ready(function(){
    $('.g-signin2').click(function(event){
        event.preventDefault()
        onSignIn()
    })

    $('.sign-out').click(function(event){
        event.preventDefault()
        signOut()
    })
    
    function onSignIn(googleUser) {
        const profile = googleUser.getBasicProfile()
        var id_token = googleUser.getAuthResponse().id_token;
        $.ajax({
            method : 'post',
            url : 'http://localhost:3000/users/login',
            data : {
                token : id_token
            }
        })
        .done(data => {
            localStorage.setItem('token', data.data.token)
            
        })
        .fail(err => {
            console.log(err)
        })
    }

    function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        localStorage.removeItem('token')
        console.log('User signed out.');
        });
    }

})