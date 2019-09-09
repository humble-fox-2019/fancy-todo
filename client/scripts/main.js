let signupPage = $('#signup-page')
let loginPage = $('#login-page')
let dashboardPage = $('#dashboard-page')
let signupForm = document.getElementById('signup-form')
let loginForm = document.getElementById('login-form')
let addProjectForm = document.getElementById('add-project-form')

signupForm.addEventListener('submit', function(e) {
  e.preventDefault()
  signup()
})
loginForm.addEventListener('submit', function(e) {
  e.preventDefault()
  login()
})
addProjectForm.addEventListener('submit', function(e) {
  e.preventDefault()
  addProject()
})

function showSignupPage() {
  signupPage.fadeIn()
  loginPage.hide()
  dashboardPage.hide()
}

function showLoginPage() {
  signupPage.hide()
  loginPage.fadeIn()
  dashboardPage.hide()
}
function clearForm() {
  $('#signup-form')[0].reset()
  $('#login-form')[0].reset()
}

function showDashboard() {
  clearForm()
  signupPage.hide()
  loginPage.hide()
  dashboardPage.fadeIn()
  $('#button-add-project').show()
  $('#nav-login').html(`
    <p>Welcome, <b>${localStorage.getItem('username')}</b></p>
    <button class="button line" onclick=logout()>Logout</button>
  `)
  $('#project-list').html('<p><b>Loading...</b></p>')
  $.ajax({
    url: 'http://localhost:3000/project',
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(function(result) {
    $('#project-list').html('')
    for(let i=0;i<result.length;i++) {
      $('#project-list').append(`
        <div class="project-item">
          <h1>${result[i].title}</h1>
          <p>${result[i].description}</p>
          <div class="project-item-footer">
            <div class="project-owner">
              <i class="fas fa-user-tie"></i>
              <p>${result[i].owner.username}</p>
            </div>
            <div class="project-item-action">
              <button class="btn secondary" onclick=projectDetail('${result[i]._id}')>See Details</button>
              <button class="btn delete"><i class="fas fa-trash-alt"></i></button>
              <button class="btn edit"><i class="far fa-edit"></i></button>
            </div>
          </div>
        </div>
      `)
    }
  })
}

function checkLogin() {
  let token = localStorage.getItem('token')
  if(token){
    $.ajax({
      url: 'http://localhost:3000/project',
      method: 'GET',
      headers: {
        token: localStorage.getItem('token')
      }
    })
    .done(function(result) {
      showDashboard()
    })
    .fail(function(jqXHR, textStatus) {
      if(jqXHR.status == 401){
        showLoginPage()
      }else{
        showSignupPage()
      }
    })
  }else{
    showSignupPage()
  }
}

function signup(){
  let username = $('#username-signup').val()
  let email = $('#email-signup').val()
  let password = $('#password-signup').val()

  $.ajax({
    url: 'http://localhost:3000/user/register',
    method: 'POST',
    data: { username, email, password }
  })
  .done(function(result) {
    $('#signup-error').html('')
    showLoginPage()
  })
  .fail(function(jqXHR, textStatus) {
    let errors = []
    for(let i=0;i<jqXHR.responseJSON.length;i++){
      errors.push(`<span>${jqXHR.responseJSON[i]}</span>`)
    }
    $('#signup-error').html(errors)
    $('#signup-error').fadeIn()
  })
}
function login(){
  let email = $('#email-login').val()
  let password = $('#password-login').val()

  $.ajax({
    url: 'http://localhost:3000/user/login',
    method: 'POST',
    data: { email, password }
  })
  .done(function(result) {
    localStorage.setItem("token", result.token)
    localStorage.setItem("username", result.user.username)
    showDashboard()
  })
  .fail(function(jqXHR, textStatus) {
    let errors = []
    for(let i=0;i<jqXHR.responseJSON.length;i++){
      errors.push(`<span>${jqXHR.responseJSON[i]}</span>`)
    }
    $('#login-error').html(errors)
    $('#login-error').show({ animate: true })
  })
}

function addProject() {
  let title = $('#project-title').val()
  let description = $('#project-description').val()

  $.ajax({
    url: 'http://localhost:3000/project',
    method: 'POST',
    headers: {
      token: localStorage.getItem('token')
    },
    data: { title, description }
  })
  .done(function(result) {
    closeAddProjectForm()
    $('#project-list').prepend(`
      <div class="project-item">
        <h1>${result.title}</h1>
        <p>${result.description}</p>
        <div class="project-item-footer">
          <div class="project-owner">
            <i class="fas fa-user-tie"></i>
            <p>${result.owner.username}</p>
          </div>
          <div class="project-item-action">
            <button class="btn secondary" onclick=projectDetail('${result._id}')>See Details</button>
            <button class="btn delete"><i class="fas fa-trash-alt"></i></button>
            <button class="btn edit"><i class="far fa-edit"></i></button>
          </div>
        </div>
      </div>
    `)
  })
  .fail(function(jqXHR,textStatus) {
    console.log(jqXHR.responseJSON)
  })
}

function logout(){
  localStorage.clear()
  showSignupPage()
  $('#nav-login').html(`
    <button class="button primary" onclick="showSignupPage()">Signup</button>
    <button class="button line" onclick="showLoginPage()">Login</button>
  `)
}

function projectDetail(id) {
  $('#project-list').hide()
  $('#button-add-project').hide()
  $('#button-add-todo').fadeIn()
  $.ajax({
    url: `http://localhost:3000/project/${id}`,
    method: 'GET',
    headers: {
      token: localStorage.getItem('token')
    }
  })
  .done(function(result) {
    console.log(result)
    $('#dashboard-title').html(`<h2>Project / ${result.title}</h2>`)
    $('#todo-list').fadeIn()
  })
  .fail(function(jqXHR, textStatus) {
    console.log(jqXHR.responseJSON)
  })
}

function closeAddProjectForm(){
  $('#add-project').hide()
}
function showAddProjectForm(){
  $('#add-project').fadeIn().css('display','flex')
}

checkLogin()