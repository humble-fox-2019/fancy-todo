const baseUrl = `http://localhost:3000`


$(document).ready(_ => {
    register()
    loginPage()
    login()
    signout()
    // todoMainPage()
    deleteTodo()
    update()
    inputUpdate()
    search()

})


// 
if (localStorage.getItem('token')) {
    console.log
    // console.log(localStorage.getItem('token'))
    $('#logOut').show()
    $('.g-signin2').hide()
    // todoMainPage()
    $('#login').hide()
    todoMainPage()
    showTodoList()
    createTodo()
    deleteTodo()
    $('.formbar').show()
    $('.home-btn').hide()

} else {
    $('.g-signin2').show()
    // signOut()
    $('.formbar').hide()
    $('signin-form').show()
    $('.btn-logout').hide()
    $('.home-btn').hide()
    // todoMainPage().hide()
}


function register() {
    $('.btn-register').click(function (event) {
        event.preventDefault()
        console.log('masuk ke register')

        $.ajax({
                method: 'POST',
                url: `${baseUrl}/user/signup`,
                data: {
                    name: $('#name').val(),
                    email: $('#email').val(),
                    password: $('#password').val()
                }
            })

            .done(data => {
                console.log(data)
                console.log('masukkkkk <<<<<<<')

                // console.log(data, '<<<<<< BERHASIL BRO')
                console.log('MASUK KE BERHASIL CEK KE DATABASE')
            })
            .fail(err => {
                console.log(err, '<<<<<< TIDAK BERHASIL BRO')
                console.log('TIDAK MASUK KE BERHASIL CEK KE DATABASE')
            })
    })
}

function loginPage() {
    console.log('masuk ke login page')
    $('.btn-login').click(function (event) {

        event.preventDefault()

        $('.homepage').empty().append(`
        <div class="banner-outer register-form align-items-center col-5">
        <div class="banner-inner">
            <h1 class="welcome-login">Welcome Bro!</h1>
            <h2 class="motto">ready to Organized your life?</h2>
            <form action="">
                <table>
                    <tr>
                        <td>Email</td>
                        <td><input type="text" name="email" id="email" placeholder="your email" required>
                        </td>
                    </tr>
                    <tr>
                        <td>Password</td>
                        <td><input type="password" name="password" id="password" placeholder="your password" required>
                        </td>
                    </tr>
                </table>
                <br>
                <a href="" class="btn-loginId btn btn-success ">login now</a>
                <br>
            </form>
            <br>


        </div>
        </div>`)
        $('.home-btn').show()
        $('.signin-form').hide()
    })
}

function homeBtn() {
    $(document).on('click', '.home-btn', function (event) {
        event.preventDefault()
        $('.homepage').empty()
        todoMainPage()
    })
}

function login() {
    $(document).on('click', '.btn-loginId', function (event) {
        event.preventDefault()
        console.log('masuk berhasil login coy')
        const dataLogin = {
            email: $('#email').val(),
            password: $('#password').val()
        }

        console.log(dataLogin, 'ini data login <<<<')
        $.ajax({
                method: 'POST',
                url: `${baseUrl}/user/signin`,
                data: dataLogin
            })

            .done(data => {
                console.log(data, '<<< BERHASIL MASUK BRO')
                localStorage.setItem('token', data.token)
                todoMainPage()
                $('.formbar').show()
                $('.btn-logout').show()
                $('signin-form').hide()

                $('.homepage').empty().append(`
                    <div class="banner-outer register-form align-items-center col-5 ">
                    <div class="banner-inner">
                        <h1 class="welcome-todomainpage">Create Something Great!</h1>
                        <form action="">
                            <table>
                                <tr>
                                    <td>Todos</td>
                                    <td><input type="text" name="todo" id="todo" placeholder="activity" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>description</td>
                                    <td><input type="text" name="todo" id="description" placeholder="description" required>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Due Date</td>
                                    <td><input type="date" name="date" id="duedate" required>
                                    </td>
                                </tr>
                            </table>
                            <div class="btn-inputtodo mt-3"></div>
                            <a href="" class="btn-submittodo ml-3 btn btn-success">Submit</a>
                            <a href="" class="btn-showtodo ml-3 btn btn-primary">Show Todo List</a>
                            <br>
                        </form>
                        <br>

                        <center>
                            <table class="table-isi text-center mt-5" style="width: 800px">
                                <thead class="thead-dark">
                                    <tr>
                                        <th scope="col">Todo</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Due Date</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                <tbody class="table-body">

                                </tbody>


                            </table>
                        </center>

                    </div>
                </div>
                    `)

            })
            .fail(err => {
                console.log(err, '<<< OOPS ERORNYA TUH DISINI')
            })
    })

}

function onSignIn(googleUser) {
    let googleToken = googleUser.getAuthResponse().id_token
    console.log(googleToken, '<<<<<<< INI TOKEN GOOGLENYA')
    $.ajax({
            method: 'post',
            url: `${baseUrl}/user/signInGoogle`,
            data: {
                token: googleToken
            }
        })
        .done(data => {
            console.log('masuk kesini bro')
            localStorage.setItem('token', data.token)
            $('#logOut').show()
            $('.g-signin2').hide()
            $('#login').hide()
            todoMainPage()
            $('.formbar').show()


        })
        .fail(err => {
            console.log(err, '<<<<< ini Errornya')
        })
}

function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
        localStorage.clear()
        $('#logOut').hide()
        $('.g-signin2').show()
        $('#login').show()
        $('.formbar').hide()
    });
}

function todoMainPage(e) {
    console.log('masuk ke main todo page')
    // e.preventDefault()
    $('.homepage').empty().append(
        `
        <div class="banner-outer register-form align-items-center col-5 ">
        <div class="banner-inner">
            <h1 class="welcome-todomainpage">Create Something Great!</h1>
            <form action="">
                <table>
                    <tr>
                        <td>Todos</td>
                        <td><input type="text" name="todo" id="todo" placeholder="activity" required>
                        </td>
                    </tr>
                    <tr>
                        <td>description</td>
                        <td><input type="text" name="todo" id="description" placeholder="description" required>
                        </td>
                    </tr>
                    <tr>
                        <td>Due Date</td>
                        <td><input type="date" name="date" id="duedate" required>
                        </td>
                    </tr>
                </table>
                <div class="btn-inputtodo mt-3"></div>
                <a href="" class="btn-submittodo ml-3 btn btn-success">Submit</a>
                <a href="" class="btn-showtodo ml-3 btn btn-primary">Show Todo List</a>
                <br>
            </form>
            <br>

            <center>
            
                <table class="table-isi text-center mt-5" style="width: 800px">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Todo</th>
                            <th scope="col">Description</th>
                            <th scope="col">Due Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody class="table-body">

                    </tbody>
                </table>

            </center>

        </div>
    </div>`)
    $('.home-btn').hide()
}

function signout() {
    $(document).on('click', '.btn-logout', function (event) {
        event.preventDefault()
        $('.homepage').empty()
            .append(`
            <div class="banner-outer register-form align-items-center col-5">
            <div class="banner-inner">
                <h1 class="welcome-register">Welcome to Fancy Todo</h1>
                <h2 class="motto">ready to Organized your life?</h2>
                <form action="">
                    <table>
                        <tr>
                            <td>Name</td>
                            <td><input type="text" name="name" id="name" placeholder="your username" required>
                            </td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td><input type="text" name="email" id="email" placeholder="your email" required>
                            </td>
                        </tr>
                        <tr>
                            <td>Password</td>
                            <td><input type="password" name="password" id="password" placeholder="your password"
                                    required>
                            </td>
                        </tr>
                    </table>
                    <br>
                    <div class="btn-group ml-3">
                    <a href="" class="btn-register btn btn-success">Register</a>
                    <div class="g-signin2 signin" data-onsuccess="onSignIn"></div>

                </div>
                <br>
                </form>
                <br>


            </div>
        </div>`)
        $('.g-signin2').show()

    })

}

function getTodos() {
    $.ajax({
            method: 'GET',
            url: `${baseUrl}/todo`,
            headers: {
                token: localStorage.getItem('token')
            }
        })  
        .done(data => {
            console.log(data)
            $('.table-body').empty()
            for (let i = 0; i < data.length; i++) {
                // console.log(data.length, 'masuk datanya')
                $('.table-body').append(`
                <tr>                          
                    <td>
                        ${data[i].todo}
                    </td>
                    <td>
                        ${data[i].description}
                    </td>
                    <td>
                        ${data[i].dueDate.substr(0, 10)}
                    </td>

                    <td>
                        <a href="" class="btn-status-true btn btn-outline-success">TRUE</a>
                        <a href="" class="btn btn-outline-danger">FALSE</a>
                    </td>
                    <td>
                        <a href="" class="btn-edittodo btn btn-outline-success" id="${data[i]._id}">Edit</a>
                        <a href="" class="btn-deletetodo btn btn-outline-danger" id="${data[i]._id}">Delete</a>
                    </td>
                </tr>
           `)
                if (data[i].status == false) {
                    $('.btn-status-true').hide()
                    $('.btn-status-false').show()

                } else {
                    $('.btn-status-false').hide()
                    $('.btn-status-true').show()
                }
            }
        })
        .fail(err => {
            console.log(err, '<<< ini errornya broh')
        })
}

function showTodoList() {
    $(document).on('click', '.btn-showtodo', function (event) {
        console.log('masuk ke showToDoList')
        event.preventDefault()
        getTodos()
    })
}

function createTodo() {
    $(document).on('click', '.btn-submittodo', function (event) {
        console.log('masuk kesini createTodo')
        event.preventDefault()

        let result = {
            todo: $('#todo').val(),
            description: $('#description').val(),
            dueDate: $('#duedate').val()
        }

        $.ajax({
                method: 'POST',
                url: `${baseUrl}/todo`,
                data: result,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(data => {
                console.log(data, 'ini datanya broh yang masukan')
                console.log(data)
                $('.table-body').append(`
                 
                        <tr>                          
                            <td>
                                ${data.todo}
                            </td>
                            <td>
                                ${data.description}
                            </td>
                            <td>
                                ${data.dueDate.substr(0, 10)}
                            </td>
                                    <td>
                                <a href="" class="btn-status-true btn btn-outline-success">TRUE</a>
                                <a href="" class="btn btn-outline-danger">FALSE</a>
                            </td>
                            <td>
                                <a href="" class="btn-edittodo btn btn-outline-success" id="${data._id}">Edit</a>
                                <a href="" class="btn-deletetodo btn btn-outline-danger" id="${data._id}">Delete</a>
                            </td>
    
                        </tr>
                `)
                $('.btn-status-true').hide()
            })
            .fail(err => {
                console.log(`failed to create >>>>`, err)
            })
    })
}

function deleteTodo() {
    console.log('masuk ke delete broo')
    $(document).on('click', '.btn-deletetodo', function (event) {
        event.preventDefault()
        let todoId = $(this).attr('id')
        // console.log(todoId, 'ini todo idnyaaa')

        $.ajax({
                method: 'DELETE',
                url: `${baseUrl}/todo/${todoId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(data => {
                // console.log('Berhasil Gan')
                $('.table-body').empty()
                getTodos()
            })
            .fail(err => {
                console.log(err, '<<< ini errornya di client')
                // console.log('gagaaaal adooh')
            })
    })
}

function inputUpdate() {
    console.log('masuk tahap 1 input update')
    $(document).on('click', '.btn-submitupdate', function (event) {
        event.preventDefault()
        let todoId = $(this).attr('id')
        console.log(todoId)

        let obj = {
            todo: $('#updateTodo').val(),
            description: $('#updateDescription').val(),
            dueDate: $('#updateDueDate').val()
        }
        console.log(obj)
        // console.log($('#updateTodo').val(), '<<<<<<< INI DATANYAAAA')
        $.ajax({
                method: 'PUT',
                url: `${baseUrl}/todo/${todoId}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: obj
            })
            .done(data => {
                console.log('disini brooh <<<<<<<<<')
                console.log(data, 'berhasil bro')
                $('.homepage').empty()
                todoMainPage()
            })
            .fail(err => {
                console.log(err, 'tidak berhasil bro')
            })

    })

}

function update() {

    $(document).on('click', '.btn-edittodo', function (event) {
        event.preventDefault()
        console.log('masuk ke edit')
        // $('.homepage').empty().append(`
        let todoId = $(this).attr('id')
        console.log(todoId)
        // `)
        $.ajax({
                method: 'GET',
                url: `${baseUrl}/todo/${todoId}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(data => {
                $('.homepage').empty().append(`
                <div class="banner-inner">
                <h1 class="welcome-update">Update Your Priorities</h1>
                <h2 class="motto">ready to Organized your life?</h2>
                <form action="">
                    <table>
                        <tr>
                            <td>Todo</td>
                            <td><input type="text" name="name" id="updateTodo" placeholder="${data.todo}" required>
                            </td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td><input type="text" name="email" id="updateDescription" placeholder="${data.description}" required>
                            </td>
                        </tr>

                        <tr>
                            <td>Due Date</td>
                            <td><input type="date" name="duedate" id="updateDueDate" placeholder=""
                                    required>
                            </td>
                        </tr>
                    </table>

                    <a href="" class="btn-submitupdate" id="${data._id}">submit update</a>
                    <br>
                </form>
                <br>


            </div>`)

            })
            .fail(err => {
                console.log(err, '<<< ini errornya di client')
            })
    })
}

function search() {
    // console.log('masuk search')
    $(document).on('click', '.searchButton', function (event) {
        event.preventDefault()
        let value = $('.searchbar').val()

        // console.log(value, '<<<< INI VALIENYA')
        // console.log('masuk kesini dong')
        $.ajax({
                method: 'GET',
                url: `${baseUrl}/todo/search?todo=${value}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .done(data => {
                console.log(data)
                // console.log(data)
                // console.log('masuk dan berhasil')
                $('.table-body').empty()
                for (let i = 0; i < data.length; i++) {
                    // console.log(data.length, 'masuk datanya')
                    $('.table-body').append(`
                    <tr>                          
                        <td>
                            ${data[i].todo}
                        </td>
                        <td>
                            ${data[i].description}
                        </td>
                        <td>
                            ${data[i].dueDate.substr(0, 10)}
                        </td>

                        <td>
                            <a href="" class="btn-status-true btn btn-outline-success">TRUE</a>
                            <a href="" class="btn btn-outline-danger">FALSE</a>
                        </td>
                        <td>
                            <a href="" class="btn-edittodo btn btn-outline-success" id="${data[i]._id}">Edit</a>
                            <a href="" class="btn-deletetodo btn btn-outline-danger" id="${data[i]._id}">Delete</a>
                        </td>
                    </tr>`)
                    if (data[i].status == false) {
                        $('.btn-status-true').hide()
                        $('.btn-status-false').show()

                    } else {
                        $('.btn-status-false').hide()
                        $('.btn-status-true').show()
                    }
                }
            })
            .fail(err => {
                console.log('wah searchnya gagal nih')
            })
    })
}