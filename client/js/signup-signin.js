function createSignUpForm() {
    $('.content').html('');
    let signUp = `
    <script src="https://apis.google.com/js/platform.js" async defer></script>
    <meta name="google-signin-client_id" content="1075139297559-k7it3o7qfuvahtvn1n8vd0vbpabvpufg.apps.googleusercontent.com">
    <div class="signup-form">
        <form action="" method="POST">
            <h2>Create an Account</h2>
            <p class="hint-text">Sign up with your social media account or email address</p>
            <div class="social-btn text-center">
                <div class="g-signin2" data-onsuccess="onSignIn"></div>
            </div>
            <div class="or-seperator"><b>or</b></div>
            <div class="form-group">
                <input type="text" class="form-control input-lg" name="fullname" id="fullname" placeholder="Full name" required="required">
            </div>
            <div class="form-group">
                <input type="email" class="form-control input-lg" name="email" id="email" placeholder="Email Address" required="required">
            </div>
            <div class="form-group">
                <input type="password" class="form-control input-lg" name="password" id="password" placeholder="Password" required="required">
            </div>
            <div class="form-group">
                <button class="btn btn-success btn-lg btn-block signup-btn" id="btnSignUp">Sign Up</button>
            </div>
        </form>
        <div class="text-center">Already have an account? <a id="btnLoginHere" onclick="createSignInForm()">Login here</a></div>
    </div>
    `
    $('.content').append(signUp);
}


function createSignInForm() {
    $('.content').empty();
    let signIn = `
        <script src="https://apis.google.com/js/platform.js" async defer></script>
        <meta name="google-signin-client_id" content="1075139297559-k7it3o7qfuvahtvn1n8vd0vbpabvpufg.apps.googleusercontent.com">
        <div class="signin-form">
            <form action="" method="POST">
                <h2>Sign In</h2>
                <p class="hint-text">Sign in with your social media account or email address</p>
                <div class="social-btn text-center">
                    <div class="g-signin2" data-onsuccess="onSignIn"></div>
                </div>
                <div class="or-seperator"><b>or</b></div>
                <div class="form-group">
                    <input type="email" class="form-control input-lg" name="email" id="email" placeholder="Email Address" required="required">
                </div>
                <div class="form-group">
                    <input type="password" class="form-control input-lg" name="password" id="password" placeholder="Password" required="required">
                </div>
                <div class="form-group">
                    <button type="submit" class="btn btn-success btn-lg btn-block signin-btn" id="btnSignIn">Sign In</button>
                </div>
            </form>
            <div class="text-center">Don't have an account? <a id="btnRegisterHere" onclick="createSignUpForm()">Register here</a></div>
        </div>
    `
    $('.content').append(signIn);
}

function signUp() {
    console.log('signup di klik nih')
    // event.preventDefault();
    const name = $('#fullname').val()
          email = $('#email').val()
          password = $('#password').val();
    
    console.log(name, email, password)
    $.ajax({
        url: `${baseURL}/users/signup`,
        method: 'POST',
        data: {
            name,
            email,
            password
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })
}

function signIn() {
    const email = $('#email').val(),
          password = $('#password').val();
    
    console.log(email, password);
    $.ajax({
        url: `${baseURL}/users/signin`,
        method: 'POST',
        data: {
            email,
            password
        }
    })
    .then(response => {
        console.log(response);
        const {UserId, name, token } = response;
        localStorage.setItem('UserId', UserId);
        localStorage.setItem('name', name);
        localStorage.setItem('token', token);
    })
    .catch(err => {
        console.log(err);
    })
} 