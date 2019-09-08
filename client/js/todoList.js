function getTodoList() {
    
    $.ajax({
        url: `${baseURL}/todos`,
        method: 'GET',
        headers: {
            token
        }
    })
    .then(todos => {
        // console.log(todos)
        insertList(todos);
    })
    .catch(err => {
        console.log(err);
    })
}

function getDetail(todo) {
    const TodoId = todo.getAttribute('id');
    $.ajax({
        url: `${baseURL}/todos/${TodoId}`,
        method: 'GET',
        headers: {
            token
        }
    })
    .then(todo => {
        console.log(todo);
        // $('#todoDetail').remove();
        createTodoDetail(todo);
    })
    .catch(err => {
        console.log(err);
    })
}

function addTodo(todoName) {
    
    $.ajax({
        url: `${baseURL}/todos`,
        method: 'POST',
        headers: {
            token
        },
        data: {
            name: todoName
        }
    })
    .then(response => {
        console.log(response);
        showList();
    })
    .catch(err => {
        console.log(err);
    })
}

function updateTodo() {
    const TodoId = $('#TodoId').val()
          name = $('#todoName').val()
          description = $('#description').val()
          due_date = $('#due_date').val()
          status = $('#status').attr('checked') ? true : false
          UserId = localStorage.getItem('UserId');
    
    let dateString = due_date ? new Date(due_date).toISOString() : '';

    console.log(TodoId, name, description, dateString, status);
    $.ajax({
        url: `${baseURL}/todos/${TodoId}`,
        method: 'PUT',
        headers: {
            token
        },
        data: {
            name, 
            description,
            due_date,
            status,
            UserId
        }
    })
    .then(todo => {
        console.log(todo);
        showList();
    })
    .catch(err => {
        console.log(err);
    })
}

function deleteTodo(todo) {
    const TodoId = todo.getAttribute('id');
    $.ajax({
        url: `${baseURL}/todos/${TodoId}`,
        method: 'DELETE',
        headers: {
            token
        }
    })
    .then(todo => {
        console.log(todo);
        // $('#todoDetail').remove();
        showList();
    })
    .catch(err => {
        console.log(err);
    })
}

function insertList(todos) {
    todos.forEach((todo, index) => {
        let list = `
        <li>
            <input type="checkbox" id="${todo._id}" onclick="toggleTodo(this)" data-index="${index}" ${todo.status ? "checked" : ""}/>
            <label id="${todo._id}" onclick="getDetail(this)"> ${todo.name}</label>
            <i class="fa fa-times" aria-hidden="true" id="${todo._id}" style="cursor: pointer" onclick="deleteTodo(this)"></i>
        </li>
        `
        $('#list').append(list);
    })
}

function showList() {
    $('#list').html('');
    getTodoList();
}

function clearList() {
    $('#list').html('');
}

function toggleTodo(todo) {
    const TodoId = todo.getAttribute('id');

    console.log('eh aku diklik', todo);
    console.log(TodoId)
    $.ajax({
        url: `${baseURL}/todos/${TodoId}/done`,
        method: 'PATCH',
        headers: {
            token
        }
    })
    .then(response => {
        console.log(response);
        showList();
    })
    .catch(err => {
        console.log(err);
    })
}



