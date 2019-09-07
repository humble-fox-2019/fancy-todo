const baseUrl = 'http://localhost:3000'
$(document).ready(function(){

    $('.btn-register').click(function(event){
        let name = $('#name').val()
        let username = $('#usernameRegis').val()
        let password = $('#passwordRegis').val()
        let email = $('#email').val()
        let phone = $('#phone').val()

        console.log({ name, username, password, email, phone})
        
        event.preventDefault()
        $.ajax({
            url : `${baseUrl}/users/register`,
            method : 'post',
            data : {
                name, username, password, email, phone
            }
        })
        .done(function({ data }) {
            localStorage.setItem('token', data.token)
        })
        .fail(err => {
            console.log(err)
        })  
    })
})