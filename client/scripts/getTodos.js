function getDeadline(date) {
  let day = 24 * 3600 * 1000
  let today = new Date().getTime()
  let dueDate = new Date(date).getTime()
  let difference = Math.floor((dueDate - today) / day)
  if (difference < 0) {
    return `<p style="color:red">It's already pass ${Math.abs(difference)} days</p>`
  } else if (difference === 0) {
    return '<p style="color:green">Today</p>'
  } else {
    return `<p style="color:green">${difference} days left</p>`
  }
}

function getAll() {
  newClick()
  $('.uncomplete').empty()
  $('.completed').empty()
  $.ajax({
    method: "GET",
    url: 'http://localhost:3000/todos',
    headers: {
      token: localStorage.token
      // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDczNDk1OTgyOWQ3NzU0MTRhNTQyYTIiLCJuYW1lIjoiQXl1IFN1ZGkiLCJlbWFpbCI6ImF5dXN1ZGlAbWFpbC5jb20iLCJpYXQiOjE1Njc4NDQyNTB9.0uyC4Jp8kp4vNnxDlI5XVFfjed_idshC-4cgr91qrSA'
    }
  })
    .done(({
      todos
    }) => {
      if (todos.length > 0) {
        let x = 1
        let y = 1
        $(".container").show()
        todos.forEach((el, i) => {

          if (!el.description) {
            el.description = '----'
          }
          let getDaysLeft = getDeadline(el.dueDate)
          let dueDate = new Date(el.dueDate).toDateString()
          if (!el.status) {
            console.log('nah looh');
            let html = `
                        <div class="sendMe-${el._id}" id="yellow">
                <div class="task" id="${el._id}-todo">
                    <div>
                        <b>${y}. ${el.name}</b>
                        <ul style="white-space:nowrap; display:inline">
                            <i class="fas fa-trash-alt" id=${el._id} onclick="deleteTodo('${el._id}')"></i>
                            <i class="fas fa-pencil-alt" id=${el._id} onclick="showEdit(this)" ></i>
                            <i class="fas fa-check" id="${el._id}" onclick="updateTodo(this)"></i>
                            <i class="fas fa-book-open" id="${el._id}" onclick="showDesc(this)"></i>
                        </ul>
                    </div>
                    <div class="descHidden-${el._id}" style="display:none; margin-top:2vh" >
                        <div class="box-desc" id=${el._id} style="display:hidden" onclick="closeDesc(this)">
                            <div style="background-color:hotpink; border-radius: 8px; " >
                                    <i class="fas fa-window-close" style="float:right;"></i>
                                    <div class="wrapper">
                                <div class="desc">
                                    <label>Name :</label>
                                    <b><p>${el.name}</p></b>
                                    <label>Description :</label>
                                    <p>${el.description}</p>
                                    <label>Deadline :</label>
                                    <b>${getDaysLeft}</b>
                                    <label>Due Date :</label>
                                    <p>${dueDate}</p>
                                    <button type="button" class="btn btn-warning btn-sm" onclick="getHtml('${el._id}')">
                                    <i>Send to My Email</i>
                                </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`
            $('.uncomplete').append(html)
            y++
          } else if (el.status) {
            console.log(el.status);
            let html = `
                        <div class="sendMe-${el._id}" id="test">
                            <div class="task" id="${el._id}-todo">
                                <div>
                                    <b>${x}. ${el.name}</b>
                                    <ul style="white-space:nowrap; display:inline">
                                        <i class="fas fa-trash-alt" id=${el._id} onclick="deleteTodo('${el._id}')"></i>
                                        <i class="fas fa-pencil-alt" id=${el._id} onclick="showEdit(this)" ></i>
                                        <i class="fas fa-undo-alt" id="${el._id}" onclick="updateTodo(this)"></i>
                                        <i class="fas fa-book-open" id="${el._id}" onclick="showDesc(this)"></i>
                                    </ul>
                                </div>
                                <div class="descHidden-${el._id}" style="display:none; margin-top:2vh">
                                    <div class="box-desc" id=${el._id} style="display:hidden" onclick="closeDesc(this)">
                                        <div style="background-color:hotpink; border-radius: 8px; " >
                                                <i class="fas fa-window-close" style="float:right;"></i>
                                            <div class="desc">
                                                <label>Name :</label>
                                                <b><p>${el.name}</p></b>
                                                <label>Description :</label>
                                                <p>${el.description}</p>
                                                <label>Due Date :</label>
                                                <p>${dueDate}</p>
                                                <button type="button" class="btn btn-warning btn-sm" onclick="getHtml('${el._id}')">
                                                <i>Send to My Email</i>
                                            </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`
            $('.completed').append(html)
            x++
            // console.log(html);
          }
        });
      } else {
        $(".yourTodo").show()
        $(".yourTodo").append(`
                <div class="noTdodo" style="color:black; background:yellow; margin-top:8%">
                <h2 style="text-align:center;">There's No To-Do List<h2>
                <div>`)
        $(".container").hide()
      }
    })
    .fail(err => {
      console.log(err);
    })

}


function showDesc(input) {
  newClick()
  $(`.descHidden-${input.id}`).show()
  $(`i#${input.id}.fa-book-open`).hide()
  // console.log(input.id);
}
function closeDesc(input) {
  newClick()
  $(`.descHidden-${input.id}`).hide()
  $(`i#${input.id}.fa-book-open`).show()
}

function deleteTodo(input) {
  newClick()
  $.ajax({
    method: 'DELETE',
    url: `http://localhost:3000/todos/${input}`,
    headers: {
      token: localStorage.token
    }
  })
    .done(() => {
      getAll()
      console.log('berhasil delete');
    })
    .fail(err => {
      console.log(err);
    })
}

function updateTodo(input) {
  newClick()
  let symbol = input.className;
  let status;
  if (symbol === 'fas fa-check') {
    status = true
  }
  else {
    status = false
  }
  $.ajax({
    method: 'PATCH',
    url: `http://localhost:3000/todos/${input.id}`,
    headers: {
      token: localStorage.token
    },
    data: {
      status
    }
  })
    .done(data => {
      getAll()
      console.log(data);
    })
    .fail(err => {
      console.log(err);
    })
}