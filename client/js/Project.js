let tempDataProjectNew;
let IdProjectCurrent;
let RenderFn;
function RenderInvitation (){
    event.preventDefault();
    $.ajax({
        url: 'http://localhost:3000/project/invite',
        method : 'GET',
        headers : {
          token : localStorage.token
        }
    })
    .done(function(data){
        $('#reqProject').empty()
        data.forEach(el=>{
            $('#reqProject').append(`
        <div class="mb-3 confirm-list">
            <div class="d-flex flex-column confirm-left">
                <p style="color : blue; font-size: 19px; margin-bottom: 5px;">${el.inviter}</p>
                <p style="font-size: 14px;">Invite You to join his project (${el.ProjectName})</p>
            </div>
            <div class="d-flex flex-row">
                <div>
                    <button class="button-confirm mt-2" onclick="confirmJoin('${el._id}','${el.ProjectName}')" >Confirm</button>
                </div>
                <div class="ml-2">
                        <button class="button-confirm-delete mt-2">Delete</button>
                </div>
            </div>
        </div>
        `)
        })
        if(data.length <= 0){
            $('#reqProject').append(`
                <p>You have no invited</p>
            `)
        }
        console.log(data , ' ini ke render <<<<<<<<<<')
    })
    .fail(function(err){
        console.log(err , ' error ======')
    })
}

function confirmJoin (id,name){
    console.log(id ,  name)
    Swal.fire({
        title: `Are you sure to Join ${name} Project?`,
        text: "You able to create todo in this project",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Join this Project'
      }).then((result) => {
        if (result.value) {
            AcceptInvitation(id)
        }
      })
}

function AcceptInvitation (id){
    event.preventDefault();
    $.ajax({
        url: `http://localhost:3000/project/confirm/${id}`,
        method : 'PATCH',
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data)
        Swal.fire(
            'Joined!',
            'You Succes Join this Project',
            'success'
          )
        RenderInvitation()
        RenderProjectList()
    })
    .fail(function(err){
        console.log(err)
    })
    // console.log(_id , ' masuk sini')
}

function RenderProjectList (){
    event.preventDefault();
    Loadinss()
    $.ajax({
        url: `http://localhost:3000/project`,
        method : 'GET',
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        $('#project-body').empty()
        data.forEach((el , index)=>{
            $('#project-body').append(`
            <tr style="color: #6a9ae6; ">
              <th scope="row">${index + 1}</th>
              <th>${el.name}</th>
              <td><a href="#" onclick="getOneProject('${el._id}')">Show Detail</a></td>
              <td><a href="#" onclick="getDataUser('${el._id}')">Add</a></td>
            </tr>
            `)
        })
        $('#h1-project').show()
        $('#project-list').show()
        $('#project-body').show()
        // $('#detail-Projects').show()
        // $('#detail-project-right').show()
        // $('#detail-project-left').show()
        $('#detail-Projects').hide()
        $('#detail-project-right').hide()
        $('#detail-project-left').hide()
        $('#h1-todo').hide()
        $('#todo-list').hide()
        $('#input-todo').hide()
        $('#project').hide()
        console.log(data , 'YAHOOOOOOOOOOOO !!!!')
    })
    .fail(function(err){
        console.log(err)
    })
}

function Loadinss (){
    let timerInterval
    Swal.fire({
    title: 'Be Patient',
    html: 'Loading....',
    timer: 1000,
    onBeforeOpen: () => {
        Swal.showLoading()
        timerInterval = setInterval(() => {
        Swal.getContent().querySelector('strong')
            .textContent = Swal.getTimerLeft()
        }, 100)
    },
    onClose: () => {
        clearInterval(timerInterval)
    }
    }).then((result) => {
    if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.timer
    ) {
        console.log('I was closed by the timer')
    }
    })
}

// input-todo2-form-mine

$(document).ready(function() { 
    $('#input-todo2-form-mine').submit(function() {
        event.preventDefault();
        $.ajax({
            url: `http://localhost:3000/project/${IdProjectCurrent}/todo`,
            method : 'PATCH',
            headers : {
              token : localStorage.token
            },
            data : {
                name: $('#todo-name-p').val(),
                des: $('#todo-des-p').val(),
                date : $('#datepicker-p').val()
            }
        })
        .done(function(data){
            Swal.fire(
                'Created!',
                'You Succes Created Todo in this Project',
                'success'
              )
            getOneProject(IdProjectCurrent)
            console.log(data)
        })
        .fail(function(err){
            console.log(err)
        })
    })
})

function getOneProject(id , idDeleted ,  idUpdated , idUpdated2){
    Loadinss()
    event.preventDefault();
    console.log('kenapa error anjir')
    $('#detail-project-left').empty()
    $.ajax({
        url: `http://localhost:3000/project/${id}`,
        method : 'GET',
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        $('#detail-Projects').show()
        $('#detail-project-right').show()
        $('#detail-project-left').show()
        // $('#detail-project-left').append(` <p class="title-first-one">Your Todo List</p>`)
        $('#detail-project-left').append(`
        <thead>
            <tr>
                <th>name</th>
                <th>Status</th>
                <th>action</th>
            </tr>
        </thead>
        <tbody id="table-todo-mine">
            
        </tbody>
        
        `)
        data.Todo.forEach(el=>{
            if(el._id != idDeleted){
                let status = '&#9989'
                let completeOrNot = `<a href="#" onclick="unCompleteTodo('${el._id}')" >Uncomplete</a>`
                if(!el.status){
                    status = '&#10060'
                    completeOrNot = `<a href="#" onclick="completeTodo('${el._id}')">Complete</a>`
                }
                if(el._id == idUpdated){
                    status = '&#9989'
                    completeOrNot = `<a href="#" >Uncomplete</a>`
                }
                if(el._id == idUpdated2 ){
                    status = '&#10060'
                    completeOrNot = `<a href="#" onclick="completeTodo('${el._id}')">Complete</a>`
                }
                $('#table-todo-mine').append(`
                    <tr>
                        <td>${el.name}</td>
                        <td>${status}</td>
                        <td>${completeOrNot} | <a href="#" onclick="confirmDelete('${el._id}')">Delete</a></td>
                    </tr>
                `)
                // $('#detail-project-left').append(`
                //     <div class="d-flex flex-row justify-content-between">
                //     </div>
                //     <div class="body-first-one d-flex flex-row justify-content-between">
                //         <p>${el.name}</p>  <p> ${status} </p>  
                //         <p> ${completeOrNot} | <a href="#" type=""submit  id="delete-todo-p" onclick="confirmDelete('${el._id}')">Delete</a> </p>
                //     </div>
                // `)
            }
           
        })
        IdProjectCurrent =  id

        // console.log(data.Todo , ' wkwkwkkkkk0k-k--k-k-')
    })
    .fail(function(err){
        console.log(err)
    })
}

$(document).ready(function() {
    $('#delete-todo-p'.click(function(){
            // getOneProject(IdProjectCurrent)
            // $('#detail-project-left').empty()
            // console.log('JALAN CUY ININ SFKDSKFDSKFDSFKDS')
            event.preventDefault();
            $.ajax({
                url: `http://localhost:3000/project/${IdProjectCurrent}/todo/${id}`,
                method : 'DELETE',
                headers : {
                  token : localStorage.getItem('token')
                }
            })
            .done(function(data){
                // Loadinss()
                getOneProject(IdProjectCurrent)
                // console.log(data , ' epepepepepep')
            })
            .fail(function(err){
                console.log(err)
            })
    }))
})

function confirmDelete (id){
    Swal.fire({
        title: `Are you sure to Join Delete this todo`,
        text: "You able to delete",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete this todo'
      }).then((result) => {
        if (result.value) {
            deleteTodoHere(id)
        }
      })
}


function deleteTodoHere(id){
    event.preventDefault()
    getOneProject(IdProjectCurrent , id)
    console.log(IdProjectCurrent)
    $.ajax({
        url: `http://localhost:3000/project/${IdProjectCurrent}/todo/${id}`,
        method : 'DELETE',
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(' lama tak jalan')
        $('#detail-project-left').empty()
    })
    .fail(function(err){
        console.log(err)
    })
}

function completeTodo (id){
    getOneProject(IdProjectCurrent , null , id  )
    $.ajax({
        url: `http://localhost:3000/project/${IdProjectCurrent}/todo/${id}/complete`,
        method : 'PATCH',
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data)
        // console.log(' lama tak jalan')
        // $('#detail-project-left').empty()
        getOneProject(IdProjectCurrent)
    })
    .fail(function(err){
        console.log(err)
    })
}

function unCompleteTodo (id){
    getOneProject(IdProjectCurrent , null , null ,  id  )
    $.ajax({
        url: `http://localhost:3000/project/${IdProjectCurrent}/todo/${id}/uncomplete`,
        method : 'PATCH',
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data)
        getOneProject(IdProjectCurrent)
    })
    .fail(function(err){
        console.log(err)
    })
}

function getDataUser(id){
    $.ajax({
        url: `http://localhost:3000/project/${IdProjectCurrent}/getUser`,
        method : 'GET',
        headers : {
          token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        console.log(data , ' !!!IMPORTANT BANGET YA 0-------------------------------------0----------------------------------')
        // getOneProject(IdProjectCurrent)
    })
    .fail(function(err){
        console.log(err)
    })
}

// getDataUser()

