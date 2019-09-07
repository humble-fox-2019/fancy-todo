// const baseUrl = 'http://localhost:3000'
$(document).ready(function(){

    $('.btn-login').click(function(event){

        let username = $('#usernameLogin').val()
        let password = $('#passwordLogin').val()
        event.preventDefault()
        $.ajax({
            url : `${baseUrl}/users/signIn`,
            method : 'post',
            data : {
                username, password
            }
        })
        .done(function(data) {
            console.log(data)
            console.log(`,,,,,,,,,,,,,,,<<<<<<<<<<<<`)
            localStorage.setItem('token', data.token)
        })
        .fail(err => {
            console.log(err)
        })  
    })
})