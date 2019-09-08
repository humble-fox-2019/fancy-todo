function WhenUserHasLogin(){
  $('#register-form').hide()
  $('#login-form').hide()
  $('#input-todo').show()
  $('#project').hide()
  $('#navbar-todo1').show()
  $('#Error-Login').hide()
  $('#todo-list').hide()
  $('#h1-todo').hide()
  $('#sukses-add').hide()
  $('#input-todo-123').show() 
  $('#edit-todo').hide()
  $('#nav-item-1').removeClass('a-disabled')
  $('#nav-item-2').removeClass('a-disabled')
  $('#nav-item-3').removeClass('a-disabled')
  $('#nav-item-4').removeClass('a-disabled')
  $('#nav-item-5').removeClass('a-disabled')
  $('#h1-project').hide()
  $('#project-list').hide()
  $('#project-body').hide()
  $('#detail-Projects').hide()
  $('#detail-project-right').hide()
  $('#detail-project-left').hide()
}

// function WhenUserHasLoginAsync(cb){
  
//   $('#register-form').hide()
//   $('#login-form').hide()
//   $('#input-todo').show()
//   $('#navbar-todo1').show()
//   $('#Error-Login').hide()
//   $('#todo-list').hide()
//   $('#sukses-add').hide()
// }

function WhenUserHasNotLogin(){
  $('#input-todo-123').hide()
  $('#register-form').hide()
  $('#login-form').show()
  $('#input-todo').hide()
  $('#project').hide()
  $('#navbar-todo1').hide()
  $('#Error-Login').hide()
  $('#todo-list').hide()
  $('#h1-todo').hide()
  $('#sukses-add').hide()
  $('#edit-todo').hide()
  $('#nav-item-1').addClass('a-disabled')
  $('#nav-item-2').addClass('a-disabled')
  $('#nav-item-3').addClass('a-disabled')
  $('#nav-item-4').addClass('a-disabled')
  $('#nav-item-5').addClass('a-disabled')
  $('#h1-project').hide()
  $('#project-list').hide()
  $('#project-body').hide()
  $('#detail-Projects').hide()
  $('#detail-project-right').hide()
  $('#detail-project-left').hide()
}

if(localStorage.getItem(`token`)){
  WhenUserHasLogin()
}else {
  WhenUserHasNotLogin()
}
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    // $('')
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    console.log('Token: ' + googleUser.getAuthResponse().id_token);
    localStorage.setItem('token' , googleUser.getAuthResponse().id_token)
    // WhenUserHasLogin()
    AddToDB(googleUser.getAuthResponse().id_token)
}



function AddToDB(token){
  event.preventDefault();
  $.ajax({
    url: 'http://localhost:3000/user/register/google',
    method: 'POST',
    data: {
      id_token : token,
    },
  })
  .done(function(token1) {
    // loadingSwall()
    localStorage.setItem('token' , token1.token)
    console.log(token1.token , ' ini token dia')
    WhenUserHasLogin()
    RenderMember()
  })
  .fail(function(jqXHR, textStatus) {
    console.log('Error:', textStatus);
  });
}
$(document).ready(function() {
  
  $('#login-click').submit(function(){
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/user/login',
      method: 'POST',
      data: {
        email: $('#email-login').val(),
        password: $('#password-login').val()
      },
    })
      .done(function(data) {
        console.log(data)
        console.log(data)
        
        localStorage.setItem('token' , data.token)
        WhenUserHasLogin()
      })
      .fail(function(jqXHR, textStatus) {
        console.log(jqXHR.responseJSON.message)
        // console.log('Error:', textStatus.err);
        // $('#Error-Login').show()
        $("#Error-Login").html(jqXHR.responseJSON.message.message)
        $("#Error-Login").fadeIn("slow");
        setTimeout((d)=>{
          return $("#Error-Login").fadeOut("slow");
        },4000)
        document.getElementById('Error-Login').innerHTML = jqXHR.responseJSON.message
      })
  })

   
  $('#register-click').submit(function() {
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/user/register',
      method: 'POST',
      data: {
        name: $('#name-register').val(),
        email: $('#email-register').val(),
        password: $('#password-register').val()
      },
    })
      .done(function(data) {
        console.log(data)
        localStorage.setItem('token' , data.token)
        WhenUserHasLogin()
      })
      .fail(function(jqXHR, textStatus) {
        console.log('Error:', textStatus);
      });
  });  
  
  $('#input-todo2-form').submit(function(){
    event.preventDefault();
    $.ajax({
      url: 'http://localhost:3000/todo',
      method: 'POST',
      data: {
        name: $('#todo-name').val(),
        des: $('#todo-des').val(),
        date : $('#datepicker').val()
      },
      headers : {
        token : localStorage.token
      }
    })
    .done(function(data) {
      console.log(localStorage.token , ' ini token yang dikirim ke server')
        // console.log( , ' value dari date picker')) 
        WhenUserHasLogin()
        ShowAfterCreate()
        // $('#sukses-add').show()
        $("#sukses-add").fadeIn("slow");
        setTimeout((d)=>{
          return $("#sukses-add").fadeOut("slow");
        },3000)
        console.log('berhasil add todo , ======++++>>>>>>+')
        $('#sukses-add').show()
       
        // $('#sukses-add').hide()
      })
      .fail(function(jqXHR, textStatus) {
        console.log(jqXHR.responseJSON.message.message)
        console.log('Error:', textStatus);
        $("#Error-Login").html(jqXHR.responseJSON.message.message)
        $("#Error-Login").fadeIn("slow");
        setTimeout((d)=>{
          return $("#Error-Login").fadeOut("slow");
        },4000)
      });
  })
  
  
  
})

function editTodo(id){
  console.log(id , ',,,,,,,,,,,,=m,<<<<<<<<<<<<<<<<<<<<<<<<<')
  $.ajax({
    url: `http://localhost:3000/todo/${id}`,
    method: 'PUT',
    data: {
      name: document.getElementById('todo-name-edit').value,
      des : document.getElementById('todo-des-edit').value,
    },
  headers :  {
    token : localStorage.token
  }
  })
    .done(function(data) {
      // $('#todo-list').show()
      ShowAfterCreate();
      document.getElementById('todo-des-edit').value   = ''
      document.getElementById('todo-name-edit').value = ''
      })
    .fail(function(jqXHR, textStatus) {
      console.log(jqXHR)
    })
  // $('#input-todo2-edit').submit(function(){
  //   // event.preventDefault();
  //   // $('#todo-name-edit').val(`${name}`)  
  //   // $('#todo-des-edit').val(`${des}`)  
    
  // })
}

function ShowAfterCreate(id){
  event.preventDefault();
  // $('#todo-body').empty()
  $.ajax({
    url: 'http://localhost:3000/todo',
    method: 'GET',
    headers :  {
      token : localStorage.token
    }
  }
  )
    .done(function(data) {
      $('#todo-body').empty()
        let num = 1
        data.forEach(el=>{
          // console.log(el._id)
          let completeOrNot;
          if(el.status){
            el.status = '&#9989'
            completeOrNot = `<input type="submit" class="input-link" value="UNCOMPLETE" onclick="UnCompleteTodo('${el._id}')" ></input>`
          }else {
            el.status = '&#10060'
            completeOrNot = `<input type="submit" class="input-link" value="COMPLETE" onclick="CompleteTodo('${el._id}')" ></input>`
          }
          if(el._id == id){
            $('#todo-body').append(`
            <tr style="color: #6a9ae6; ">
              <th scope="row">${num}</th>
              <th><input class="form-control" type="text" placeholder="name.." id="todo-name-edit" value="${el.name}" style="opacity: 0.7; height : 24px; width : 96px; padding : 0;" ></th>
              <th><input class="form-control" type="text" placeholder="desription.." id="todo-des-edit" value="${el.description}" style="opacity: 0.7; height : 24px; width : 96px; padding : 0;" ></th>
              <td>${el.status} </td>
              <td>${el.due_date}</td>
              <td><input type="submit" class="input-link"  onclick="editTodo('${el._id}')" value="save" >  <input type="submit" class="input-link" onclick="ShowAfterCreate()" value="cancel"></a></td>
              <td>${completeOrNot}</td>
            </tr>
          `)
          }else {
            $('#todo-body').append(`
          <tr style="color: #6a9ae6; ">
            <th scope="row">${num}</th>
            <th>${el.name}</th>
            <td>${el.description}</td>
            <td>${el.status} </td>
            <td>${el.due_date}</td>
            <td><input type="submit" class="input-link"  onclick="changeTable('${el._id}')" value="edit" >  <input type="submit" class="input-link" onclick="deleteTodo('${el._id}')" value="Delete"></a></td>
            <td>${completeOrNot}</td>
          </tr>
        `)
          }
          
        num++
        })
        $('#h1-todo').show()
        $('#todo-list').show()
        $('#input-todo').hide()
        $('#project').hide()
        $('#h1-project').hide()
        $('#project-list').hide()
        $('#project-body').hide()
    })
    .fail(function(jqXHR, textStatus) {
      console.log('Error:', textStatus ,  jqXHR);
    });


  
}


function changeTable(id){
  console.log(id , ' ini idi nya njir anjier')
  ShowAfterCreate(id)
}

function tesRenderEdit(id , name , des ,  due_date){
  // idNow = id
  RenderFormEdit(id , name , des ,  due_date) 
}

function RenderFormEdit(id , name , des ,  due_date){
  document.getElementById('todo-des-edit').value   = des
  document.getElementById('todo-name-edit').value = name
  document.getElementById('datepicker2-edit').value = due_date
  // console.log(name , des , due_date , id)
  editTodo(id)
  // console.log(id)
  // $('#edit-todo').show()
  // $('#todo-list').hide()
  // $('#todo-list').hide()
  

}

function renderProject (){
  event.preventDefault();
        $('#todo-list').hide()
        $('#h1-todo').hide()
        $('#input-todo').hide()
        $('#edit-todo').hide()
        $('#project').show()
        $('#h1-project').hide()
        $('#project-list').hide()
        $('#project-body').hide()
        $('#detail-Projects').hide()
        $('#detail-project-right').hide()
        $('#detail-project-left').hide()
        $.ajax({
          url : 'http://localhost:3000/project/AllUser',
          method : 'GET',
          headers : {
            token : localStorage.getItem('token')
          }
        })
        .done(function(){
          
        })
        .fail(function(){

        })
  // $.ajax({
  //   url: 'http://localhost:3000/project',
  //   method: 'GET',
  //   headers :  {
  //     token : localStorage.token
  //   }
  // }
  // )
  //   .done(function(data) {
  //     $('#todo-body').empty()
  //       let num = 1
  //       data.forEach(el=>{
  //         // console.log(el._id)
  //         let completeOrNot;
  //         if(el.status){
  //           el.status = '&#9989'
  //           completeOrNot = `<input type="submit" class="input-link" value="UNCOMPLETE" onclick="UnCompleteTodo('${el._id}')" ></input>`
  //         }else {
  //           el.status = '&#10060'
  //           completeOrNot = `<input type="submit" class="input-link" value="COMPLETE" onclick="CompleteTodo('${el._id}')" ></input>`
  //         }
  //         $('#todo-body').append(`
  //         <tr style="color: #6a9ae6; ">
  //           <th scope="row">${num}</th>
  //           <th>${el.name}</th>
  //           <td>${el.description}</td>
  //           <td>${el.status} </td>
  //           <td>${el.due_date}</td>
  //           <td><input type="submit" class="input-link" onclick="RenderFormEdit('${el._id}','${el.name}','${el.description}','${el.due_date}')" value="edit" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">  <input type="submit" class="input-link" onclick="deleteTodo('${el._id}')" value="Delete"></a></td>
  //           <td>${completeOrNot}</td>
  //         </tr>
  //       `)
  //       num++
  //       })
  //       $('#todo-list').hide()
  //       $('#h1-todo').hide()
  //       $('#input-todo').hide()
  //       $('#edit-todo').hide()
  //       $('#project').show()
  //   })
  //   .fail(function(jqXHR, textStatus) {
  //     console.log('Error:', textStatus ,  jqXHR);
  //   });
}



function CompleteTodo(id){
  event.preventDefault();
  console.log(id , ' ini id nya ya ==================>><><')
  $.ajax({
    url: `http://localhost:3000/todo/${id}/complete`,
    method: 'PATCH',
    headers : {
      token : localStorage.token
    }
  })
  .done(function(data){
    console.log(id)
    console.log('berhasil update ya , dari client')
    ShowAfterCreate()
  })
  .fail(function(jqXHR, textStatus) {
    console.log('Error:', textStatus ,  jqXHR);
  });
}


function UnCompleteTodo(id){
  event.preventDefault();
  console.log(id , ' ini id nya ya ==================>><><')
  $.ajax({
    url: `http://localhost:3000/todo/${id}/uncomplete`,
    method: 'PATCH',
    headers : {
      token : localStorage.token
    }
  })
  .done(function(data){
    console.log(id)
    console.log('berhasil update ya , dari client')
    ShowAfterCreate()
  })
  .fail(function(jqXHR, textStatus) {
    console.log('Error:', textStatus ,  jqXHR);
  });
}

function deleteTodo(id){
  event.preventDefault();
  console.log(id , ' ini id nya ya ==================>><><')
  $.ajax({
    url: `http://localhost:3000/todo/${id}`,
    method: 'DELETE',
    headers : {
      token : localStorage.token
    }
  })
  .done(function(data){
    console.log(id)
    console.log('berhasil delete ya , dari client')
    return ShowAfterCreate()
  })
  .fail(function(jqXHR, textStatus) {
    console.log('Error:', textStatus ,  jqXHR);
  });
}

function RenderDash(){
  // $('#input-todo').value.empty()
  $('#todo-list').hide()
  $('#h1-todo').hide()
  $('#input-todo').show()
  $('#edit-todo').hide()
  $('#project').hide()
  $('#h1-project').hide()
  $('#project-list').hide()
  $('#project-body').hide()
  $('#detail-Projects').hide()
  $('#detail-project-right').hide()
  $('#detail-project-left').hide()
  
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
    console.log('User signed out.');
    // $('#reqProject').empty()
    WhenUserHasNotLogin()
      localStorage.clear()
      
    });
}