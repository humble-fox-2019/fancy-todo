function formCreate() {
  $("div.yourTodo#yourTodo").empty()
  let html = ` 
  <div class="container" id="createTodo">
  <div class="create"> 
    <h2>Create To-Do</h2>
      <form>
          <label for="">Name</label>
          <br>
          <input type="text" id="nameCreate">
          <br>
          <label>Descripiton</label>
          <br>
          <textarea id="descCreate" style="min-height:4vh; min-width: 35vh;"></textarea>
          <br>
          <label>Due Date</label>
          <br>
          <input type="date" id="dueDateCreate">
          <br>
          <br>
          <button type="button" class="btn btn-light btn-sm" class="buttonCreate" onclick="createTodo()">
          <i>Submit</i>
      </button>
          </form>
    </div>
  </div>
  `
  $("div.yourTodo#yourTodo").append(html)
}

function buttonCreate() {
  $("div.yourTodo#yourTodo").empty()
  $("div.yourTodo#yourTodo").append(`
  <center>
  <div>
  <button type="button" class="btn btn-danger btn-lg" stylee="padding :50px" onclick="formCreate()">
  <i>Create New ToDo</i>
</button>
  </div>
  </center>
`)
}

function createTodo() {
  let name = $('#nameCreate').val()
  let description = $('#descCreate').val()
  let dueDate = $('#dueDateCreate').val()
  $.ajax({
    method: 'POST',
    url: 'http://localhost:3000/todos/create',
    headers: {
      token: localStorage.token
    },
    data: {
      name,
      description,
      dueDate
    }
  })
    .done(data => {
      buttonCreate()
      getAll()
      $('input').val("")
    }
    )
    .fail(err => {
      if (err.statusText === 'Bad Request') {
        let listError = err.responseJSON.message
        let html = ''
        for (let i in listError) {
          html += `<p>${listError[i]}</p>`
        }
        console.log(html);
        $(".errors").show()
        $(".errorsList").empty()
        $(".errorsList").append(html)
      }
      else {
        let words = err.message
        $(".errors").show()
        $(".errorsList").empty()
        $(".errorsList").append(`<p><${words}/p>`)
      }
    })
}
