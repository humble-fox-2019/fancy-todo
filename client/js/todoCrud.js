function showEditTodo(id) {
    removeErrors()
    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/todos/" + id,
        headers: { "token": localStorage.getItem('token') }
    })
        .done(({ name, description, dueDate }) => {
            $('#editName').val(name)
            $('#editDesc').val(description)
            if (dueDate) $('#editDue').attr('value', dueDate)
            $('#editModal').modal('show')
            $('#editButton').click(() => {
                editTodo(id)
            })
        })
        .fail(err => {
            console.log(err)
        })
        .always(() => console.log("Ajax process done"));
}

function editTodo(id) {
    $.ajax({
        type: 'PUT',
        url: "http://localhost:3000/todos/" + id,
        data: {
            name: $('#editName').val(),
            description: $('#editDesc').val(),
            dueDate: $('#editDue').attr('value')
        },
        headers: { "token": localStorage.getItem('token') }
    })
        .done(() => {
            $('#editModal').modal('hide')
            removeErrors()
            generateCards()
        })
        .fail(err => {
            let error = err.responseJSON.join('\n')
            $('#edit-modal .modal-body').prepend(
                `<div class="alert alert-danger" role = "alert" >
                        ${error}
                    </div >`
            )
        })
        .always(() => console.log("Ajax process done"));
}

function deleteTodo(id) {
    $.ajax({
        type: 'DELETE',
        url: "http://localhost:3000/todos/" + id,
        headers: { "token": localStorage.getItem('token') }
    })
        .done(() => {
            console.log("Success Delete")
            generateCards()
        })
        .fail(err => {
            console.log(err)
            // do something else
        })
        .always(() => console.log("Ajax process done"));
}