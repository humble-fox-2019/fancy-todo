function showEdit(input) {
let id = input.id
  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/todos/${id}`,
    headers: {
      token: localStorage.token
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNDk1OTgyOWQ3NzU0MTRhNTQyYTIiLCJuYW1lIjoiQXl1IFN1ZGkiLCJlbWFpbCI6ImF5dXN1ZGlAbWFpbC5jb20iLCJpYXQiOjE1Njc4NDQyNTB9.0uyC4Jp8kp4vNnxDlI5XVFfjed_idshC-4cgr91qrSA'
    }
  })
    .done(({todo}) => {
      let placeholderV = todo.description
      if(todo.description === undefined){
       placeholderV = '---'
      }
      let date = new Date(todo.dueDate)
      let bulan = date.getMonth() + 1
      let tanggal = date.getDate()
      if (tanggal<10){
        tanggal = '0'+tanggal.toString()
      }
      if (bulan <10){
        bulan = '0'+bulan.toString()
      }
      let formatDate = date.getFullYear()+ "-" + bulan + "-" +  tanggal
      let html = `       
      <div class="edit" id="${todo._id}" style="margin:25px 0">
         <div>
            <i class="fas fa-window-close" id="${todo._id}" style="float:right;" onClick="cancelEdit(this)"></i>
        </div>
      <h2>Edit</h2>
        <form>
            <label for="">Name</label>
            <br>
            <input type="text" name="" id="nameTodo" value="${todo.name}">
            <br>
            <label for="">Descripiton</label>
            <br>
            <textarea id="comment" style="min-height:4vh; min-width: 35vh;" value="${todo.description}">${placeholderV}</textarea>
            <br>
            <label for="">Due Date</label>
            <br>
            <input type="date" id="dueDateTodo" value="${formatDate}" placeholder=${formatDate}>
            <br>
            <input type="hidden" name="statusTodo" id="statusTodo" value="${todo.status}">
            <br>
            <button type="button" id="${todo._id}" name="${todo.name}" description="${todo.description}" class="btn btn-light btn-sm" onclick="editToDo(this)">
            <i>Submit</i>
        </button>
            </form>
         
      </div>
    `   
 
      $(`i#${input.id}.fa-pencil-alt`).hide()
      $(`#${id}-todo`).append(html)
    })
    .fail(err =>{
      console.log(err);
    })
}

function editToDo(input){
  let name = $('#nameTodo').val()
  let description = $('#comment').val()
  let dueDate = $('#dueDateTodo').val()
  // console.log(input.id, '<<<<<<<<<');
  // console.log(name, description, dueDate, status,);
  $.ajax({
    method : 'PATCH',
    url :`http://localhost:3000/todos/${input.id}`,
    headers : {
      token :localStorage.token
      //  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNDk1OTgyOWQ3NzU0MTRhNTQyYTIiLCJuYW1lIjoiQXl1IFN1ZGkiLCJlbWFpbCI6ImF5dXN1ZGlAbWFpbC5jb20iLCJpYXQiOjE1Njc4NDQyNTB9.0uyC4Jp8kp4vNnxDlI5XVFfjed_idshC-4cgr91qrSA'
    },
    data : {
      name, 
      description,
      dueDate
    }
  })
  .done((data)=>{
    console.log(data);
    getAll()
    $(`div#${input.id}.edit`).remove()
    $(`i#${input.id}.fa-pencil-alt`).show()
  })
  .fail(err => {
    console.log(err);
})
}

function cancelEdit(input){
  getAll()
  let {id} = input
  $(`div#${id}.edit`).remove()
  $(`i#${id}.fa-pencil-alt`).show()
}