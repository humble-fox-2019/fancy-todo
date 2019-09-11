const url = `http://35.240.236.114`;

$(document).ready(function () {
    checkToken();
});

function checkToken() {
    if (localStorage.getItem('token')) {
        $('#nav-before').hide();
        $('#nav-after').show();
        $('#main-before').hide();
        $('#main-after').show();
        gototodo();
    } else {
        $('#main-after').hide();
        $('#nav-before').show();
        $('#nav-after').hide();
        $('#main-before').show();
        $('#sign-up').hide();
        $('#sign-in').show();
    }
}

function gototodo() {
    readAllTodo();
    $('#projectdetail').hide();
    $('#todos').show();
    $('#projects').hide();
}

function gotodetail(id) {
    console.log(id);
    readOneProject(id);
    $('#todos').hide();
    $('#projects').hide();
    $('#projectdetail').show();
}

function gotoproject() {
    readAllProject();
    $('#projectdetail').hide();
    $('#todos').hide();
    $('#projects').show();
}

function gotoin() {
    $('#sign-up').hide();
    $('#sign-in').show();
}

function gotoup() {
    $('#sign-up').show();
    $('#sign-in').hide();
}

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
}

function register() {
    event.preventDefault();
    const data = {
        name: $('#up-name').val(),
        email: $('#up-email').val(),
        password: $('#up-password').val()
    }
    axios({
        url: `${url}/users/sign-up`,
        method: 'post',
        data
    })
        .then(({ data }) => {
            gotoin();
            Swal.fire(
                'Succes',
                `Sucess register as new user`,
                'success'
            )
        })
        .catch(err => {
            console.log(err);
        })
}

function login() {
    event.preventDefault();
    const data = {
        email: $('#in-email').val(),
        password: $('#in-password').val()
    }
    axios({
        url: `${url}/users/sign-in`,
        method: 'post',
        data
    })
        .then(({ data }) => {
            console.log(data);
            gotoin();
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name);
            checkToken();
            Swal.fire(
                'Success',
                `Success login, Hi ${data.name} how are you today ?`,
                'success'
            )
        })
        .catch((error) => {
            Swal.fire("Error!", error.message, "error");
        });
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    Swal.fire(
        'Success',
        `See you again ${localStorage.getItem('name')}, enjoy your day`,
        'success'
    )
    localStorage.clear();
    checkToken();
}

function onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    axios({
        method: 'POST',
        data: {
            idToken
        },
        url: `${url}/users/g-signin`,
    })
        .then(({ data }) => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('name', data.name.split(' ')[0]);
            checkToken();
            // Swal.fire(
            //     'Success',
            //     `Success login, Hi ${data.name.split(' ')[0]} how are you today ?`,
            //     'success'
            // )
        })
        .catch((error) => {
            Swal.fire("Error!", error.message, "error");
        });
}

function addProject() {
    const token = localStorage.getItem('token');
    const title = $('#project-title').val();
    const description = $('#project-description').val();
    axios({
        url: `${url}/projects`,
        method: 'post',
        headers: {
            token
        },
        data: {
            title,
            description
        }
    })
        .then(({ data }) => {
            console.log(data);
            $('#project-title').val('');
            $('#project-description').val('');
            $('#addNewProject').modal('hide');
            gotoproject();
            Swal.fire(
                'Success',
                `Success added new Project`,
                'success'
            )
        })
        .catch(err => {
            console.log(err.message);
        })
}

function readAllTodo() {
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/tasks`,
        method: 'get',
        headers: {
            token
        }
    })
        .then(({ data }) => {
            console.log(data);
            $('#todo-list').empty();
            data.forEach(todo => {
                let btn = `Undone`;
                let status = 0;
                let bg = `bg-primary`;
                if (!todo.status) {
                    bg = `bg-danger`;
                    status = 1;
                    btn = `Done`
                }
                $('#todo-list').prepend(`
                <div class="card text-white ${bg} m-3 col-12 col-sm-12 col-md-3 p-3"
                style="max-width: 30rem;max-height: 20rem;">
                    <div class="card-header m-0">
                        <h4 class="m-0">${todo.title}</h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${todo.description}</p>
                    </div>
                    <div class="d-flex justify-content-around align-items-center">
                        <button onclick="changestatus('${todo._id}', ${status})" class="btn main-btn">${btn}</button>
                        <button type="button" data-toggle="modal" data-target="#editTodo" onclick="readOne('${todo._id}')" class="btn main-btn">Edit</button>
                        <button onclick="deleteTask('${todo._id}')" class="btn main-btn">Delete</button>
                    </div>
                </div>
                `);
            })

        })
        .catch(err => {
            console.log(err.message);
        })
}

function readAllProject() {
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/projects`,
        method: 'get',
        headers: {
            token
        }
    })
        .then(({ data }) => {
            console.log(data);
            $('#project-list').empty();
            data.forEach(project => {
                let bg = `bg-primary`;
                $('#project-list').prepend(`
                <div class="card text-white ${bg} m-3 col-12 col-sm-12 col-md-3 p-3"
                style="max-width: 30rem;max-height: 20rem;">
                    <div class="card-header m-0">
                        <h4 class="m-0">${project.title}</h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${project.description}</p>
                    </div>
                    <div class="d-flex justify-content-around align-items-center">
                        <button type="button" onclick="gotodetail('${project._id}')" class="btn main-btn">Open Project</button>
                        <button onclick="deleteProject('${project._id}')" class="btn main-btn">Delete</button>
                    </div>
                </div>
                `);
            })

        })
        .catch(err => {
            console.log(err.message);
        })
}

function readOneProject(id) {
    console.log(id);
    $('#btn-add-member').empty();
    $('#btn-add-todo').empty();
    $('#detail-title').empty();
    $('#detail-btn').empty();
    $('#member-list').empty();
    $('#project-todo-title').empty();
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/projects/${id}`,
        method: 'get',
        headers: {
            token
        }
    })
        .then(({ data }) => {
            console.log(data);
            readProjectTodo(id);
            console.log(id);
            readAllUser();
            $('#detail-title').append(`${data.title}`);
            $('#detail-btn').append(`
            <button type="button" data-toggle="modal" data-target="#addMember"
            class="btn r-btn mt-3">Add Member</button>
            <button type="button" data-toggle="modal" data-target="#addProjectTodo"
            class="btn r-btn mt-3">Add Todo</button>`);
            $('#btn-add-member').append(`
            <button type="button" onclick="addMember('${id}')" class="btn r-btn">Save</button>
            <button type="button" class="btn r-btn" data-dismiss="modal">Close</button>
            `);
            $('#btn-add-todo').append(`
            <button type="button" onclick="addProjectTodo('${id}')" class="btn r-btn">Save</button>
            <button type="button" class="btn r-btn" data-dismiss="modal">Close</button>
            `);
            data.members.forEach(member => {
                $('#member-list').append(`
                <h6>${member.name}</h6>
                `);
            })
        })
        .catch(err => {
            console.log(err.message);
        })
}

function deleteTask(id) {
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/tasks/${id}`,
        method: 'delete',
        headers: {
            token
        }
    })
        .then(() => {
            Swal.fire(
                'Success',
                `Task deleted`,
                'success'
            )
            gototodo();
        })
        .catch(err => {
            console.log(err.message);
        })
}

function readOne(id) {
    $('#edit-btn').empty();
    $('#edit-title').val('');
    $('#edit-description').val('');
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/tasks/${id}`,
        method: 'get',
        headers: {
            token
        }
    })
        .then(({ data }) => {
            $('#edit-btn').empty();
            console.log(data);
            $('#edit-title').val(data.title);
            $('#edit-description').val(data.description);
            $('#edit-btn').append(`
            <button type="button" onclick="edittodo('${data._id}')" class="btn r-btn">Save</button>
            <button type="button" class="btn r-btn" data-dismiss="modal">Close</button>
            `)
        })
        .catch(err => {
            console.log(err.message);
        })
}

function edittodo(id) {
    const token = localStorage.getItem('token');
    const title = $('#edit-title').val();
    const description = $('#edit-description').val();
    axios({
        url: `${url}/tasks/${id}`,
        method: 'put',
        headers: {
            token
        },
        data: {
            title,
            description
        }
    })
        .then(({ data }) => {
            console.log(data);
            $('#editTodo').modal('hide');
            Swal.fire(
                'Success',
                `Task has been updated`,
                'success'
            )
            gototodo();
        })
        .catch(err => {
            console.log(err.message);
        })
}

function changestatus(id, value) {
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/tasks/${id}`,
        method: 'patch',
        headers: {
            token
        },
        data: {
            value
        }
    })
        .then(({ data }) => {
            console.log(data);
            let status = `done`
            if (value === 0) {
                status = `undone`
            }
            Swal.fire(
                'Success',
                `Task has been ${status}`,
                'success'
            )
            gototodo();
        })
        .catch(err => {
            console.log(err.message);
        })
}

function readAllUser() {
    $('#users-list').empty();
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/users`,
        method: 'get',
        headers: {
            token
        }
    })
        .then(({ data }) => {
            data.forEach(user => {
                $('#users-list').append(`
                    <option value="${user._id}">${user.name}</option>
                `)
            })
            console.log(data);
        })
        .catch(err => {
            console.log(err.message);
        })
}

function addMember(id) {
    const token = localStorage.getItem('token');
    const member = $('#users-list').val();
    axios({
        url: `${url}/projects/${id}`,
        method: 'patch',
        headers: {
            token
        },
        data: {
            member
        }
    })
        .then(({ data }) => {
            $('#addMember').modal('hide');
            console.log(data);
            readOneProject(id);
            Swal.fire(
                'Success',
                `New collaborator has been added to Project`,
                'success'
            )
        })
        .catch(err => {
            console.log(err.message);
        })
}

function addProjectTodo(id) {
    const token = localStorage.getItem('token');
    const title = $('#project-todo-title').val();
    const description = $('#project-todo-description').val();
    console.log(title);
    console.log(description);
    console.log(id);
    axios({
        url: `${url}/project-todo/${id}`,
        method: 'post',
        headers: {
            token
        },
        data: {
            title,
            description
        }
    })
        .then(({ data }) => {
            $('#addProjectTodo').modal('hide');
            $('#project-todo-title').val('');
            $('project-todo-description').val('');
            console.log(data);
            readOneProject(id);
            Swal.fire(
                'Success',
                `New Todo has been added to Project`,
                'success'
            )
        })
        .catch(err => {
            console.log(err.message);
        })
}

function readProjectTodo(id) {
    $('#project-todo-list').empty();
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/project-todo/${id}`,
        method: 'get',
        headers: {
            token
        }
    })
        .then(({ data }) => {
            data.forEach(todo => {
                console.log(todo);
                let btn = `Undone`;
                let status = 0;
                let bg = `bg-primary`;
                if (!todo.status) {
                    bg = `bg-danger`;
                    status = 1;
                    btn = `Done`
                }
                $('#project-todo-list').prepend(`
                <div class="card text-white ${bg} m-3 col-12 col-sm-12 col-md-3 p-3"
                style="max-width: 30rem;max-height: 20rem;">
                    <div class="card-header m-0">
                        <h4 class="m-0">${todo.title}</h4>
                    </div>
                    <div class="card-body">
                        <p class="card-text">${todo.description}</p>
                    </div>
                    <div class="d-flex justify-content-around align-items-center">
                        <button onclick="changeStatusProject('${id}','${todo._id}', ${status})" class="btn main-btn">${btn}</button>
                        <button onclick="deleteTaskTodo('${id}', '${todo._id}')" class="btn main-btn">Delete</button>
                    </div>
                </div>
                `);
            })
        })
        .catch(err => {
            console.log(err.message);
        })
}

function changeStatusProject(id, todoId, value) {
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/project-todo/${id}`,
        method: 'patch',
        headers: {
            token
        },
        data: {
            todoId,
            value
        }
    })
        .then(({ data }) => {
            console.log(data);
            let status = `done`
            if (value === 0) {
                status = `undone`
            }
            Swal.fire(
                'Success',
                `Task has been ${status}`,
                'success'
            )
            gotodetail(id);
        })
        .catch(err => {
            console.log(err.message);
        })
}

function deleteTaskTodo(id, todoId) {
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/project-todo/${id}/${todoId}`,
        method: 'delete',
        headers: {
            token
        }
    })
        .then(() => {
            gotodetail(id);
            Swal.fire(
                'Success',
                `ToDo deleted`,
                'success'
            )
        })
        .catch(err => {
            console.log(err.message);
        })
}

function deleteProject(id) {
    const token = localStorage.getItem('token');
    axios({
        url: `${url}/projects/${id}`,
        method: 'delete',
        headers: {
            token
        }
    })
        .then(() => {
            Swal.fire(
                'Success',
                `Project deleted`,
                'success'
            )
            gotoproject()
        })
        .catch(err => {
            console.log(err.message);
            Swal.fire(
                'Error',
                `Only the one who make it can delete project`,
                'error'
            )
        })
}

function addTodo() {
    const token = localStorage.getItem('token');
    const title = $('#add-title').val();
    const description = $('#add-description').val();
    axios({
        url: `${url}/tasks`,
        method: 'post',
        headers: {
            token
        },
        data:{
            title,
            description
        }
    })
    .then(({data})=>{
        console.log(data);
        $('#add-title').val('');
        $('#add-description').val('');
        $('#addNewTodo').modal('hide');
        gototodo();
        Swal.fire(
            'Success',
            `Save todo success`,
            'success'
        );
    })
    .catch(err => {
        Swal.fire(
            'Error',
            `${err.message}`,
            'error'
        );
    })
}