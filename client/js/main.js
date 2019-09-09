function mainContent(firstname) {

    let main_template =
        `<nav class="navbar navbar-light bg-light">
        <p class="col-sm-8"> Hello, ${localStorage.getItem('firstname')} </p>     
        <p class="menu logout point-cursor" style="color: black;"> <i class="fas fa-sign-out-alt"></i> Logout</p>  
        </nav>
        <div class="row">
        

        <!-- Main Content -->
        <div class="col-sm-12" id='main-content'>

            <div class="row">
                <!-- Daily Task -->
                <div class="col-sm-6 card task-content pos-relative">
                        
                    <p class="username bg-dark text-white title raleway-font point-cursor"> List Task </p>
                    <div id="task">
                        <div class="task-list" data="">
                        <p class="title-date raleway-font"> Date </p>
                            <div class="submenu nunito-font row" style="padding-left:30px;">
                                <div class="submenu-checkbox col-sm-2"> Status </div>
                                <div class="submenu-title col-sm-7"> Title </div>
                                <div class="col-sm-2 badge bg-primary text-white"> Detail </div>
                            </div>
                        </div>
                    </div>

                    <button class="float bg-dark" id="add-task" data-toggle="modal" data-target="#add-modal">
                    <i style="color:white;"class="fas fa-plus"></i> </button>
                </div>
                <!-- Detail Task -->
                <div class="col-sm-6 card detail-task">
                    <p class="username bg-dark text-white title raleway-font"> Detail Task </p>

                    <form id='form-update'>
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input type="text" id="title" class="form-control" value="Title">
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea class="form-control" id="description" rows="3"></textarea>
                        </div>
                        <div class="form-inline">
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Status</label>
                            <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                                <option value="1" selected>ON Progress</option>
                                <option value="2"> DONE </option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>`
    let main_navbar =
        `<div class="username bg-dark text-white title raleway-font">
        <p class="col-sm-8"> Hello, ${localStorage.getItem('firstname')} </p> 
        </div>
            <p class="menu raleway-font"> Your Dashboard </p>
            <ul class="submenu nunito-font point-cursor">
                <li id='daily-task'> Daily Task </li>
            </ul>
            <p class="menu raleway-font"> Projects </p>
            <ul class="submenu nunito-font point-cursor">
                <li id="add-project point-cursor"> <i class="fas fa-plus-circle"></i> Add Project </li>
        </ul>
        <p class="menu raleway-font hvr-underline-from-left logout point-cursor" style="color: black;"> <i class="fas fa-sign-out-alt"></i> Sign Out</p>
        `

    const token = localStorage.getItem('token')

    $(document).ready(function() {
        $("#app").empty();
        $("#app").append(main_template)
        $("#vertical-navbar").append(main_navbar)

        function getTodo() {

            $.ajax({
                    url: 'http://localhost:3000/todo/gettodo',
                    method: 'GET',
                    headers: { token }
                })
                .done(data => {
                    $('#task').empty()
                    let dates = Object.keys(data)
                    for (let i = 0; i < dates.length; i++) {
                        let date = data[dates[i]]
                        var newDate = new Date(dates[i])
                        let task_title = `<p class="title-date raleway-font"> ${newDate.getDate()} ${newDate.getMonth()+1} ${newDate.getFullYear()} </p>`
                        $('#task').append(task_title)
                        for (let j = 0; j < date.length; j++) {
                            let task = date[j]
                            let template = `
                    <div class="task-list  point-cursor" id="${task.id}" style="padding: 10px 20px;">
                        <div class="submenu nunito-font row" style="padding-left:30px;">
                            <div class="submenu-checkbox col-sm-3"> ${!task.status ? "On Going":"Done"} </div>
                            <div class="submenu-title col-sm-7"> ${task.title} </div>
                            <button class="col-sm-2 rounded bg-danger text-white delete-task" value="${task.id}"><i class="trash-alt"></i> X </button>
                        </div>
                    </div>`

                            $('#task').append(template)
                        }
                    }
                })
                .fail(function(jqXHR, textStatus) {
                    console.log('fail')
                    console.log('Error:', textStatus);
                });
        }

        getTodo()

        $('body').on('click', '.daily-task', function() {
            getTodo()
        })

        $('body').on('click', '.delete-task', function() {
            let id = $(this).val()
            deleteTask(id)
        })

        $('body').on('click', '.task-list', function() {
            let id = $(this).attr('id')
            event.preventDefault()
            $.ajax({
                    url: `http://localhost:3000/todo/getbyid/${id}`,
                    method: 'GET',
                    headers: { token }
                })
                .done(data => {
                    $('#form-update').empty()
                    $('#form-update').attr('data', `${data._id}`)
                    let template =
                        `<div class="form-group>
                        <label for="title">Title</label>
                        <input type="text" id="title" class="form-control" value="${data.title}">
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea class="form-control" id="description" rows="3" >${data.description}</textarea>
                    </div>
                    <div class="form-inline">
                        <label class="my-1 mr-2" for="status">Status</label>
                        <select class="custom-select my-1 mr-sm-2" id="status">
                            <option value="false" ${(data.status) ? "":"selected" }>On Going</option>
                            <option value="true" ${(!data.status) ? "":"selected" }> Done </option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-primary update-task">Update</button>`
                    $('#form-update').append(template)
                })
                .catch(err => {
                    console.log(err)
                })
        })

        $('body').on('submit', '#form-update', function() {
            event.preventDefault()
            let id = $(this).attr('data')
            const title = $('#title').val()
            const description = $('#description').val()
            const status = $('#status').val()
            updateTask({ id, title, description, status })
        })

        $('#add-task-btn').on('click', function() {
            const title = $('#task-title').val()
            const description = $('#task-description').val()
            const date = $('#task-date').val()
            addTask({ title, description, date })
        })

        $('body').on('click', '.logout', function() {
            event.preventDefault()
            // var auth2 = gapi.auth2.getAuthInstance();
            // auth2.signOut().then(function() {
            //     console.log('User signed out.');
            // });
            localStorage.clear()
            loginContent()
        })


        function addTask(input) {
            const { title, description, date } = input
            event.preventDefault()
            $.ajax({
                    method: `post`,
                    url: `http://localhost:3000/todo/create`,
                    data: { title, description, date },
                    headers: { token }
                })
                .done(data => {
                    console.log(data)
                    getTodo()
                })
                .catch(err => {
                    console.log(err)
                })

        }

        function updateTask(input) {
            const { title, description, status } = input
            event.preventDefault()
            $.ajax({
                    method: `patch`,
                    url: `http://localhost:3000/todo/updatetodo/${input.id}`,
                    data: { title, description, status },
                    headers: { token }
                })
                .done(task => {
                    $(`#${task._id}`).empty();
                    $(`#${task._id}`).append(`<div class="submenu nunito-font row" style="padding-left:30px;">
            <div class="submenu-checkbox col-sm-3"> ${!task.status ? "On Going":"Done"} </div>
            <div class="submenu-title col-sm-7"> ${task.title} </div>
            <button class="col-sm-2 rounded bg-danger text-white delete-task" value="${task.id}"> Delete </button>
        </div>`);
                })
                .catch(err => {
                    console.log(err)
                })
        }

        function deleteTask(id) {
            console.log(id)
            event.preventDefault()
            console.log('delete')
            $.ajax({
                    url: `http://localhost:3000/todo/delete/${id}`,
                    method: 'delete',
                    headers: { token }
                })
                .done(data => {
                    $(`#${id}`).remove()
                })
                .fail(err => {
                    connsole.log(err)
                })
        }

    })

}

function loginContent() {

    let template = `<div class="row login-register" style="margin:10vh">
<div class="col-md-6 login-form">
    <h3>Login Form</h3>
    <form class="login">
        <div class="form-group">
            <input type="email" class="form-control" id="login-email" placeholder="Your Email *" required />
        </div>
        <div class="form-group">
            <input type="password" class="form-control" id="login-password" placeholder="Your Password *" required/>
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Login" />
        </div>
       <div class="g-signin2" data-onsuccess="onSignIn"></div>
    </form>

</div>
<div class="col-md-6 register-form">
    <h3>Register Form</h3>
    <form class="register">
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Firstname*" id="register-firstname" value="" required />
        </div>
        <div class="form-group">
            <input type="text" class="form-control" placeholder="Lastname *" id="register-lastname" value="" required />
        </div>
        <div class="form-group">
            <input type="email" class="form-control" placeholder="Your Email *" id="register-email" value="" required/>
        </div>
        <div class="form-group">
            <input type="password" class="form-control" placeholder="Your Password *" id="register-password" value="" />
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary" value="Register" />
        </div>
    </form>
</div>
</div>`

    $('#app').empty();
    $('#app').append(template)


    $('.login').on('submit', function() {
        const email = $('#login-email').val();
        const password = $('#login-password').val();
        event.preventDefault()
        Swal.showLoading()
        $.ajax({
                method: `post`,
                url: `http://localhost:3000/user/login`,
                data: { email, password }
            })
            .done(data => {
                $('#app').empty();
                $('.login-register').remove()
                Swal.fire({
                    type: 'success',
                    text: 'successfully login',
                })
                localStorage.setItem('token', data.token)
                localStorage.setItem('firstname', data.firstname)
                mainContent()
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    text: 'Something error',
                })
            })
    })

    $('.register').on('submit', function() {
        const email = $('#register-email').val();
        const password = $('#register-password').val();
        const firstname = $('#register-firstname').val();
        const lastname = $('#register-lastname').val();
        event.preventDefault()
        Swal.showLoading()
        $.ajax({
                method: `post`,
                url: `http://localhost:3000/user/register`,
                data: { email, password, firstname, lastname }
            })
            .done(data => {
                Swal.fire({
                    type: 'success',
                    text: 'successfully register',
                })

            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    text: 'Something error',
                })
            })
    })

    $('body').on('click', '.g-signin2n', function onSignIn(googleUser) {
        console.log('aaa')
        event.preventDefault()
        var id_token = googleUser.getAuthResponse().id_token
        $.ajax({
                url: `http://localhost:3000/user/loginOauth`,
                method: `POST`,
                data: {
                    token: id_token
                }
            })
            .then(data => {
                console.log('berhasil')
                localStorage.setItem('token', data.token)
                localStorage.setItem('firstname', data.firstname)
                mainContent()
            })
            .catch(err => {
                console.log(err)
            })
    })




}