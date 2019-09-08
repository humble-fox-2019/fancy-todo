const baseURL = 'http://localhost:3000';
const token = localStorage.getItem('token');

$(document).ready(function() {
    console.log('ready');
    // console.log(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
        succesLogin();
    } else {
        succesLogout();
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
       succesLogin();
   });

   $('.content').on('keypress', '#add-todo', function(event) {
        let keycode = event.keyCode || event.which;
        if (keycode == '13') {
            let todoName = $(this).val();
            addTodo(todoName);   
            $(this).val('');
        }
   })

   $('.content').on('click', '#btnUpdate', function(event) {
        event.preventDefault();
        console.log('btn update di klik lo ini');
        updateTodo();
    })

    $('.content').on('click', '#btnAddToCalendar', function(event) {
        event.preventDefault();
        console.log('add to calendar di klikkkk')
        // handleAuthClick()
        // handleClientLoad();
        createEvent();
    })

    $('.content').on('click', '#btnAuthorize', function(event) {
        event.preventDefault();
        console.log('authorize calendar di klikkkk')
        handleAuthClick()
        // handleClientLoad();
        // createEvent();
    })


})

function succesLogin() {
    $('#userLoggedIn').text(localStorage.getItem('name'))
    $('#userLoggedIn').show();
    $('#btnLogout').show();
    $('.content').empty();
    // showList();
    createFancyTodo();
}

function succesLogout() {
    $('#userLoggedIn').text('')
    $('#userLoggedIn').hide();
    $('#btnLogout').hide();
    // clearList();
    // $('.content').html('');
    createSignUpForm();    
}

function createFancyTodo() {
    $('.content').html('');
    let fancyTodo = `
    <div class="container pt-5">
        <div class="row justify-content-center" id="todo-page">
            <div class="col-md-6">
                <div class="todolist">
                    <h1>Todos</h1>
                    <input type="text" class="form-control" id="add-todo" placeholder="Add todo ...">
                    
                    <hr>
                    <ul id="list" class="list-unstyled">
                        
                    </ul>
                    <div class="todo-footer">
                        <strong><span class="count-todos"></span></strong> Items Left
                    </div>
                </div>
            </div>
            
        </div>
    </div>
    `
    $('.content').append(fancyTodo);
    $('#list').html('');
    showList();
}

function createTodoDetail(todo) {
    $('#todoDetail').remove();
    let due_date;
    let formatedDate;
    if (todo.due_date) {
        due_date = new Date(todo.due_date);
        let date = ("0" + due_date.getDate()).slice(-2);
        let month = ("0" + (due_date.getMonth() + 1)).slice(-2);
        formatedDate = due_date.getFullYear() + "-" + (month) + "-" + (date);
    }
    console.log(formatedDate);
    let html = `
        <script async defer src="https://apis.google.com/js/api.js"
                        onload="this.onload=function(){};handleClientLoad()"
                        onreadystatechange="if (this.readyState === 'complete') this.onload()"></script>
        <div class="col-md-6" id="todoDetail">
            <div class="todolist">
                <h1> Todo Detail </h1>
                <form>
                    <input type="input" class="form-control" id="TodoId" value="${todo._id}" hidden>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="input" class="form-control" id="todoName" value="${todo.name}">
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <input type="input" class="form-control" id="description" value="${todo.description ? todo.description : ''}">
                    </div>
                    <div class="form-group">
                        <label>Due date</label>
                        <input type="date" class="form-control" id="due_date" value="${formatedDate ? formatedDate : ''}"/>
                    </div>
                    <div class="form-group">                    
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" id="status" onclick="toggleChecked()" ${todo.status ? 'checked' : ''}>
                                </div>
                            </div>
                            <label class="form-control">Is Done?</label>
                        </div>
                    </div>
                    
                   <div class='todo-footer'>
                        <button type="submit" class="btn btn-success" id="btnUpdate">Save</button>
                        <button type="submit" class="btn btn-success" id="btnAddToCalendar">Add to Google Calendar</button>
                        <button type="submit" class="btn btn-success" id="btnAuthorize" style="display: none">Authorize Google Calendar</button>
                        <button type="submit" class="btn btn-success" id="btnSignOut" style="display: none">SignOut</button>
                   </div>
                </form>                
            </div>
        </div>
    `
    $('#todo-page').append(html);
    handleClientLoad();
}

function toggleChecked() {
    console.log( $('#status').attr('checked'))
    $('#status').attr('checked') ? $('#status').attr('checked', false) : $('#status').attr('checked', true);
    console.log( $('#status').attr('checked'))
}

function promptMessage(message) {
    let modalBody =  $('#messagePrompt').find('.modal-body')
    modalBody.append(message)
    
    $('#messagePrompt').modal();
 }