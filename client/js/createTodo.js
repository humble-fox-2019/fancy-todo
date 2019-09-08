function showCreateTodo() {
    $('#createModal').modal('show')
}

function createTodo() {
    removeErrors()
    $.ajax({
        type: 'POST',
        url: "http://localhost:3000/todos/user",
        data: {
            name: $('#todoName').val(),
            description: $('#description').val(),
            dueDate: $('#dueDate').val()
        },
        headers: { "token": localStorage.getItem("token") }
    })
        .done((newTodo) => {
            $('#todoName').val('')
            $('#description').val('')
            $('#dueDate').val('')
            $('#createModal').modal('hide')
            setTimeout(() => {
                generateCards()
            }, 500);
        })
        .fail(err => {
            let error = err.responseJSON.join('\n')
            $('#create-Modal .modal-body').prepend(
                `<div class="alert alert-danger" role = "alert" >
                        ${error}
                    </div >`
            )

        })
        .always(() => console.log("Ajax process done"));
}