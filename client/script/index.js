const baseUrl = 'http://localhost:3000'
$(document).ready(function(){
    if(!localStorage.getItem('token')){
        $('nav').show()
        $('.box-login').show()
        $('.box-regis').hide()
        $('.box-todos').hide()
        $('.box-cardList').hide()
        $('.box-password').hide()
        $('.box-edit-profile').hide()
    } else {
        $('nav').show()
        $('.box-login').hide()
        $('.box-regis').hide()
        $('.box-todos').hide()
        $('.box-cardList').show()
        $('.box-password').hide()
        $('.box-edit-profile').hide()
    }

    $('.toRegister').click(function(event){
        event.preventDefault()
        $('nav').hide()
        $('.box-login').hide()
        $('.box-regis').show()
        $('.box-todos').hide()
        $('.box-cardList').hide()
        $('.box-password').hide()
        $('.box-edit-profile').hide()
    })

    $('.toLogin').click(function(event){
        event.preventDefault()
        $('nav').hide()
        $('.box-login').show()
        $('.box-regis').hide()
        $('.box-todos').hide()
        $('.box-cardList').hide()
        $('.box-password').hide()
        $('.box-edit-profile').hide()
    })

    $('.create-list').click(function(event){
        event.preventDefault()
        let name = $('#name-list').val()
        $.ajax({
            url : `${baseUrl}/lists`,
            method : 'post',
            data : {
                name
            },
            headers: {
                token : localStorage.getItem('token')
            }
        })
        .done(function(data){
            mainPage()
        })
        .fail(err => {
            console.log(err)
        })
    })

    

        // $.ajax({
        //     url : `${baseUrl}/lists`
        //     method : 'delete'
        // })

})