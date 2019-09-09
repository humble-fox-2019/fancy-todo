
    $('.btn-login').click(function(event){

        let email = $('#emailLogin').val()
        let password = $('#passwordLogin').val()
        event.preventDefault()
        $.ajax({
            url : `${baseUrl}/users/signIn`,
            method : 'post',
            data : {
                email, password
            }
        })
        .done(function(data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('username', data.username)
            mainPage()
        })
        .fail(err => {
            console.log(err)
        })  
    })