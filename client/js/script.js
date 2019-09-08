const baseURL = 'http://localhost:3000';

$(document).ready(function() {
    console.log('ready');
    console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
        createFancyTodo()
    } else {
        createSignUpForm();
    }
    
   $('.content').on('click', '#btnSignUp', function(event) {
       event.preventDefault();
       console.log('btn sign up di klik lo ini')

       signUp();
       createSignInForm();
   })

   $('.content').on('click', '#btnSignIn', function(event) {
       event.preventDefault();
       console.log('btn sign in di klik lo ini');

       signIn();
       createFancyTodo();
   })   
})


function createFancyTodo() {
    $('.content').empty();
    let fancyTodo = `
        <div class="todo-page">
            <h1>Welcome to Fancy Todo</h1>
        </div>
    `
    $('.content').append(fancyTodo);
}
