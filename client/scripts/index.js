$(document).ready(function () {
  preventClick()

  // check logged in
  checkToken()

  // render page
  loginBtn()
  logoutBtn()
  registerBtn()

  // pages
  loginPage()
  registerPage()

  // todos
  addTodo()
})

function checkToken() {
  const token = localStorage.getItem('token')
  if (token) {
    $('.main-page').hide()
    $('.login-page').hide()
    $('.todo-page').show()
    $('#login-btn').hide()
    $('#logout-btn').css('display', 'flex')
    loadTodo()
  }
}

function preventClick() {
  $('a').click(function (event) {
    event.preventDefault()
  })

  $('button').click(function (event) {
    event.preventDefault()
  })
}

// login
function loginBtn() {
  $('#login-btn').click(function () {
    $('.main-page').hide()
    $('.registration-page').hide()
    $('.todo-page').hide()
    $('.login-page').css('display', 'flex')
  })
}

function loginPage() {
  $('.login-page button').click(function () {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/user/login',
      data: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    })
      .done(login => {
        console.log(login);
        localStorage.setItem('token', login.token)
        $('#login-btn').hide()
        $('#logout-btn').css('display', 'flex')
        $('.login-page').hide()
        $('.todo-page').show()
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  })
}

// register
function registerBtn() {
  $('#register-btn').click(function () {
    $('.main-page').hide()
    $('.todo-page').hide()
    $('.login-page').hide()
    $('.registration-page').css('display', 'flex')
  })
}

function registerPage() {
  $('.registration-page button').click(function () {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/user/register',
      data: {
        email: $('#email-reg').val(),
        password: $('#password-reg').val()
      }
    })
      .done(register => {
        localStorage.setItem('token', register.token)
        $('.registration-page').hide()
        checkToken()
        // $('#login-btn').hide()
        // $('#logout-btn').css('display', 'flex')
        // $('.login-page').hide()
        // $('.todo-page').show()
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  })
}


// logout
function logoutBtn() {
  $('#logout-btn').click(function () {
    $('#logout-btn').hide()
    $('#login-btn').css('display', 'flex')
    $('.todo-page').hide()
    $('.main-page').css('display', 'flex')
    localStorage.removeItem('token')
  })
}


// todo
function loadTodo() {
  $.ajax({
    method: 'GET',
    url: 'http://localhost:3000/user/todo',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todos => {
      $('tbody').empty()
      if (todos) {
        todos.forEach(todo => {
          // const NowMoment = moment()
          // console.log(nowMoment);
          // const remaining = new Date(new Date(todo.due_date).getTime() - Date.now())
          // const remaining = new Date(Date.now())
          // const remaining = new Date(todo.due_date) - new Date(Date.now())
          // const remaining = moment(new Date(todo.due_date)).from(new Date())
          // console.log(remaining);
          const desc = (todo.description) ? todo.description : 'empty'
          const status = (todo.status) ? 'done' : 'not completed'
          const date = (todo.due_date) ? todo.due_date.split('T')[0] : 'empty'
          // const status = (todo.status) ? '<a href="" id="todo-status">done</a>' : '<a href="" id="todo-status">not completed</a>'
          $('tbody').append(
            `
            <tr>
              <td><a href="" value="${todo._id}" class="todo-one">${todo.name}</a></td>
              <td>${desc}</td>
              <td>${date}</td>
              <td>${status}</td>
              <td><a href="" value="${todo._id}" class="todo-delete">Delete</a> | <a href="" value="${todo._id}" class="todo-complete">Complete</a></td>
            </tr>
            `
          )
        })
        preventClick()
      }
      deleteTodo()
      completeTodo()
      loadTodoOne()
      randomQuotes()
      $('#table').DataTable();
    })
    .fail(err => {
      console.log(err)
    })
}

function loadTodoOne() {
  $('.todo-one').click(function () {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/user/todo/${$(this).attr('value')}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(todo => {
        $('.todo-page').hide()
        $('.todoOne-page').hide()
        $('#todoOne-title').attr('value', todo.todo.name)
        $('#todoOne-description').attr('value', todo.todo.description)
        $('.todoOne-page').css('display', 'flex')
        updateTodo(todo.todo._id)
      })
      .fail(err => {
        console.log(err)
      })
  })
}

function addTodo() {
  $('.todo-page button').click(function () {
    $.ajax({
      method: 'POST',
      url: 'http://localhost:3000/user/todo/',
      data: {
        name: $('#todo-name').val()
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(created => {
        loadTodo()
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  })
}

function deleteTodo() {
  $('.todo-delete').click(function () {
    $.ajax({
      method: 'DELETE',
      url: `http://localhost:3000/user/todo/${$(this).attr('value')}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(deleted => {
        console.log(deleted);
        loadTodo()
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  })
}

function completeTodo() {
  $('.todo-complete').click(function () {
    $.ajax({
      method: 'PATCH',
      url: `http://localhost:3000/user/todo/${$(this).attr('value')}`,
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(updated => {
        console.log(updated);
        loadTodo()
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  })
}

function updateTodo(id) {
  $('.todoOne-page button').click(function () {
    $.ajax({
      method: 'PUT',
      url: `http://localhost:3000/user/todo/${id}`,
      data: {
        name: $('#todoOne-title').val(),
        description: $('#todoOne-description').val(),
      },
      headers: {
        token: localStorage.getItem('token')
      }
    })
      .done(updated => {
        loadTodo()
        $('.todoOne-page').hide()
        $('.todo-page').show()
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  })
}

function randomQuotes() {
  $.ajax({
    method: 'GET',
    url: 'https://programming-quotes-api.herokuapp.com/quotes/random',
  })
    .done(quote => {
      console.log(quote);
      $('.random-quotes').empty()
      $('.random-quotes').append(
        `
        <p>${quote.en} -${quote.author}</p>
        `
      )
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })
}