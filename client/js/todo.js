$(document).ready(() => {
    //logo click
    $('#logo').click(event => {
        event.preventDefault()
        hideAll()
        $('#home').show()
        $('#todo-index').show()
        $('#todo-add').hide()
        $('#todo-edit').hide()
        todoGetAll()
    })

    //Add Todo click
    $('#todo-add-button').click(event => {
        event.preventDefault()
        $('#todo-index').hide()
        $('#todo-add').show()
    })

    //Todo add form
    $("#todo-add-form").submit(function (event) {
        event.preventDefault()

        $.ajax({
            method: "post",
            url: 'http://localhost:3000/todo/',
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                "name": $('#todo-add-name').val(),
                "description": $('#todo-add-description').val()
                },
            }
        )
        .done(data => {
            resetTodoAddForm()
            $('#todo-add').hide()
            $('#todo-index').show()
            todoGetAll()
        })
        .fail(err => {
            resetTodoAddForm()
            Swal.fire({
                type: 'error',
                text: err.responseJSON.message
            });
        })

    })

    //Todo edit form
    $(document).on('submit', '#todo-edit-form', function (event) {
        event.preventDefault()
        var id = $('#todo-edit-id').val()

        $.ajax({
                method: "patch",
                url: `http://localhost:3000/todo/${id}`,
                headers: {
                    token: localStorage.getItem('token')
                },
                data: {
                    "name": $('#todo-edit-name').val(),
                    "description": $('#todo-edit-description').val()
                },
            })
            .done(data => {
                resetTodoEditForm()
                $('#todo-edit').hide()
                $('#todo-detail').empty()
                $('#todo-index').show()
                todoGetAll()
            })
            .fail(err => {
                Swal.fire({
                    type: 'error',
                    text: err.responseJSON.message
                });
            })

    })
    
    
    //item click
    $(document).on('click', '.todo-item', function (event) {
        event.preventDefault()

        $('#todo-detail').empty()
        $.ajax({
                method: 'get',
                url: `http://localhost:3000/todo/${$(this).attr('id')}`,
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            .then(todo => {
                var btnDone = ""
                if(todo.isDone === false) { btnDone = `<button id="${todo._id}" class="todo-done btn btn-sm btn-success">
                    Done
                    <i class="fa fa-check ml-1"></i>
                </button>` }
                $('#todo-detail').append(`
                <h3>${todo.name}</h3>
                <p>
                    ${todo.description}
                </p>
                <hr>
                <button id="${todo._id}" class="todo-delete btn btn-sm btn-danger">
                    Delete Todo
                    <i class="fa fa-trash ml-1"></i>
                </button>

                <button id="${todo._id}" class="todo-edit btn btn-sm btn-info">
                    Edit Todo
                    <i class="fa fa-edit ml-1"></i>
                </button>

                ${btnDone}
           `)
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    text: err.responseJSON.message
                });
            })

    });

    $(document).on('click', '.todo-delete', function (event) {
        event.preventDefault()

        $.ajax({
            method: 'delete',
            url: `http://localhost:3000/todo/${$(this).attr('id')}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((result) => {
            $('#todo-detail').empty()
            todoGetAll()
        })            
        .catch(err => {
            Swal.fire({
                type: 'error',
                text: err.responseJSON.message
            });
        })

    });

    $(document).on('click', '.todo-done', function (event) {
        event.preventDefault()

        $.ajax({
            method: "patch",
            url: `http://localhost:3000/todo/${$(this).attr('id')}/done`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                "isDone": true
            },
        })
        .then((result) => {
            $('#todo-detail').empty()
            todoGetAll()
        })            
        .catch(err => {
            Swal.fire({
                type: 'error',
                text: err.responseJSON.message
            });
        })

    });

    $(document).on('click', '.todo-edit', function (event) {
        event.preventDefault()

        $.ajax({
            method: 'get',
            url: `http://localhost:3000/todo/${$(this).attr('id')}`,
            headers: {
                token: localStorage.getItem('token')
            }
        })
        .then((todo) => {
            $('#todo-index').hide()
            $('#todo-edit').show()
            $('#todo-edit').empty()
            $('#todo-edit').append(`
                <div class="row">
                    <div class="col-md-6 offset-md-3">
                        <div class="card my-4">
                            <div class="card-header">
                                Edit Todo
                            </div>
                            <div class="card-body">
                                <form id="todo-edit-form">
                                    <div class="form-group">
                                        <label for="todo-edit-name">Todo name</label>
                                        <input value="${todo.name}" autofocus type="text" class="form-control" id="todo-edit-name">
                                    </div>
                                    <div class="form-group">
                                        <label for="todo-edit-description">Description</label>
                                        <textarea class="form-control" id="todo-edit-description" rows="3">${todo.description}</textarea>
                                    </div>
                                    <input value="${todo._id}" type="hidden" class="form-control" id="todo-edit-id">
                                    <button class="btn btn-info" type="submit">Update Todo</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
           `)
        })            
        .catch(err => {
            Swal.fire({
                type: 'error',
                text: err.responseJSON.message
            });
        })

    });



})

function todoGetAll(){
    $('#todo-list-private').empty()
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/todo/',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(todos =>{
        $.each(todos, function(index, value){
            if(value.isDone === true) {
                $('#todo-list-private').append(`
                    <li class="list-group-item">
                        <a id="${value._id}" class="todo-item" href="#">${value.name}</a>
                        <br><small>status : done</small>
                    </li>
            `);
            } else {
                $('#todo-list-private').append(`
                    <li class="list-group-item">
                        <a id="${value._id}" class="todo-item" href="#">${value.name}</a>
                        <br><small>status : not yet done</small>
                    </li>
            `);
            }

           
        })
    })
    .catch(err => {
        Swal.fire({
            type: 'error',
            text: err.responseJSON.message
        });
    })
}

function resetTodoAddForm() {
    $('#todo-add-name').val("")
    $('#todo-add-description').val("")
}

function resetTodoEditForm() {
    $('#todo-edit-name').val("")
    $('#todo-edit-description').val("")
}
