function addTodo() {
  $.ajax({
    method: 'POST',
    url: 'http://35.185.188.15/todos/',
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      name: $('#todo-name').val(),
    }
  })
    .done(() => {
      $.toast('Todo successfully added')
      $('#todo-name').empty()
      fetchTodos()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })
}

function deleteTodo(params) {
  $.ajax({
    method: 'DELETE',
    url: `http://35.185.188.15/todos/${params}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(() => {
      $.toast('Todo successfully deleted')
      fetchTodos()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })
}

function completeTodo(params) {
  $.ajax({
    method: 'PATCH',
    url: `http://35.185.188.15/todos/${params}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(() => {
      $.toast('Todo successfully completed')
      fetchTodos()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })
}

function editTodo(params) {
  $('#edit-todo').empty()
  $.ajax({
    method: 'GET',
    url: `http://35.185.188.15/todos/${params}`,
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todo => {
      console.log(todo)
      $('#edit-todo').append(
        `
        <div>
          <form class="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4">
            <div class="flex flex-col mb-4">
              <label for="title">Title</label>
              <input type="text" value="${todo.name}" id="title"
                class="rounded w-64 rounded-sm border border-blue-200 focus:border-blue-400 focus:outline-none px-2 py-1">
            </div>
            <div class="flex flex-col mb-4">
              <label for="Description">Description</label>
              <input type="text" value="${todo.description}" id="description"
                class="rounded w-64 rounded-sm border border-blue-200 focus:border-blue-400 focus:outline-none px-2 py-1">
            </div>
            <div class="flex flex-col mb-4">
              <label for="due-date">Due Date</label>
              <input type="text" value="${todo.due_date ? '' : ''}" id="due-date"
                class="rounded w-64 rounded-sm border border-blue-200 focus:border-blue-400 focus:outline-none px-2 py-1">
            </div>
            <div class="flex flex-col mb-4">
              <p>Status: <span class="font-bold">${todo.status ? 'done' : 'not completed'}</span></p>
            </div>
            <div class="w-full flex justify-center">
              <button onclick="submitEdit('${todo._id}')" class="px-2 py-1 rounded bg-blue-500 text-white">Save edits</button>
            </div>
          </form>
        </div>
        `
      )
      navigate(['#edit-todo', '#logout-btn'])
      preventClick()
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })

}

function submitEdit(params) {
  console.log(params)
  $.ajax({
    method: 'PUT',
    url: `http://35.185.188.15/todos/${params}`,
    headers: {
      token: localStorage.getItem('token')
    },
    data: {
      name: $('#title').val(),
      description: $('#description').val()
    }
  })
    .done(todo => {
      fetchTodos()
      console.log(todo)
    })
    .fail(err => {
      console.log(err.responseJSON.message)
    })

  navigate(['#todos', '#logout-btn', '#quotes-container'])
}

function fetchTodos() {
  $('#table').DataTable().destroy()
  $.ajax({
    method: 'GET',
    url: 'http://35.185.188.15/todos',
    headers: {
      token: localStorage.getItem('token')
    }
  })
    .done(todos => {
      $('tbody').empty()
      if (todos) {
        todos.forEach(todo => {
          const desc = (todo.description) ? todo.description : 'empty'
          const status = (todo.status) ? 'done' : 'not completed'
          const date = (todo.due_date) ? todo.due_date.split('T')[0] : 'empty'
          $('tbody').append(
            `
            <tr>
              <td><button onclick="editTodo('${todo._id}')" class="text-blue-600 hover:text-blue-400">${todo.name}</button></td>
              <td class="text-center">${desc}</td>
              <td class="text-center">${date}</td>
              <td class="text-center">${status}</td>
              <td class="text-center"><button onclick="deleteTodo('${todo._id}')" class="text-blue-600 hover:text-blue-400">Delete</button> | <button onclick="completeTodo('${todo._id}')" class="text-blue-600 hover:text-blue-400">Complete</button></td>
            </tr>
            `
          )
        })
      }
      // randomQuotes()
      preventClick()
      $('#table').DataTable()

    })
    .fail(err => {
      console.log(err)
    })
}