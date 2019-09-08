$(document).ready(() => {
    checkSignedIn()
    showRegister()
})

function showRegister() {
    $('#showRegister').click(() => {
        $('.modal-content').empty().append(
            `<div class="modal-header">
                        <h5 class="modal-title text-center" id="loginModal">Register</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="username" class="col-form-label">Username</label>
                                <input type="text" class="form-control" id="username" name="username"
                                    placeholder="Enter your username" required>
                            </div>
                            <div class="form-group">
                                <label for="email" class="col-form-label">Email</label>
                                <input type="email" class="form-control" id="email" name="email"
                                    placeholder="Enter your email" required>
                            </div>
                            <div class="form-group">
                                <label for="password" class="col-form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password"
                                    placeholder="Enter your password" required>
                            </div>
                        </form>
                        <button type="button" id="registerSubmit" class="btn btn-primary" onclick="register()">Register</button>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="backtoLogin">Back to login</button>
                    </div>`
        )
        showLogin()
    })
}

function showLogin() {
    $('#backtoLogin').click(() => {
        $('.modal-content').empty().append(
            `<div class="modal-header">
                        <h5 class="modal-title text-center" id="loginModal">Login</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="form-group">
                                <label for="identifier" class="col-form-label">Username/Email</label>
                                <input type="text" class="form-control" id="identifier" name="identifier"
                                    placeholder="Enter your username or email" required>
                            </div>
                            <div class="form-group">
                                <label for="password" class="col-form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password"
                                    placeholder="Enter your password" required>
                            </div>
                        </form>
                        <button type="button" id="loginSubmit" onclick="login()" class="btn btn-primary">Login</button>
                        <p>Or login via</p>
                        <div class="g-signin2" data-onsuccess="onSignIn"></div>
                    </div>
                    <div class="modal-footer align-middle text-left">
                        <div class="row">
                            <div class="col-6" style="text-align: center">
                                <span class="text-align: center">Not a user?</span>
                            </div>
                            <div class="col-6">
                                <button type="button" class="btn btn-primary" id="showRegister">Register</button>
                            </div>
                        </div>
                    </div>`
        )
        showRegister()
    })
}

function register() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/users/register",
        data: {
            username: $('#username').val(),
            email: $('#email').val(),
            password: $('#password').val()
        }
    })
        .done((payload) => {
            console.log(payload);
            console.log("Success Register")
            localStorage.setItem('token', payload.token)
            checkSignedIn()
        })
        .fail(err => {
            console.log(err)
        })
}

function checkSignedIn() {
    if (localStorage.getItem('token')) {
        $('#loginModal').modal('hide')
    } else {
        $('#loginModal').modal('show')
    }
}

function login() {
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/users/login",
        data: {
            identifier: $('#identifier').val(),
            password: $('#password').val()
        }
    })
        .done((payload) => {
            console.log("Success Login")
            localStorage.setItem('token', payload.token)
            checkSignedIn()
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => console.log("Ajax process done"));
}