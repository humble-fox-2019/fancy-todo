function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url : 'http://localhost:3000/users/login',
        method : 'post',
        data : {
            token : id_token
        }
    })
    .done(function(data){
        localStorage.setItem('token', data.token)
        localStorage.setItem('username', data.username)
        mainPage()

    })
    .fail(err => {
        console.log(err)
    })
}

function mainPage(){
    $.ajax({
        url : `http://localhost:3000/users/${localStorage.getItem('username')}`,
        method : 'get'
    })
    .done(function(data){
        $('.box-cardList').empty()
        addCard('.box-cardList', data.lists)
        $('nav').show()
        $('.box-login').hide()
        $('.box-regis').hide()
        $('.box-todos').hide()
        $('.box-cardList').show()
        $('.box-password').hide()
        $('.box-edit-profile').hide()
    })
    .fail(err => {
        console.log(err)
    })
}

function addCard(where, data){
    $.each(data, function(index, value){
        $(where).append(
            `<table style="width: 100%">
                <tr>
                    <td>${value.name}</td>
                    <td><a href="#"  class="viewList">View</a> | <a href="#" class="editList">Edit</a> | <a href="#" class="deleteList" list-id="${value._id}" onclick="deleteList(this)">Delete</a></td>
                </tr>
            </table>`
        )
    })               
}