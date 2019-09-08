(() => {
    const baseUrl = "http://localhost:3000";

    function displayName() {
        $('#displayName').text(localStorage.getItem('name'));
    }

    displayName()

    function isSignin() {
        if (!localStorage.getItem('token')) {
            window.location.href = "#signin";

            Swal.fire({
                position: 'top-center',
                type: 'error',
                title: "you does not have permission to access this page.",
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    isSignin();

    $("#addTaskButton").bind("click", function () {
        $('#modal-task').modal('show');
        $('#modal-task .block-title').text('Add a new task');
        $('#modal-task form')[0].reset();
    });

    $("#saveTaskButton").bind("click", function () {
        $('#modal-task').modal('hide');
        Swal.showLoading();

        $.ajax({
            type: "POST",
            url: baseUrl + '/todos',
            data: $("#modal-task form").serialize(),
            beforeSend: function (request) {
                request.setRequestHeader("token", localStorage.getItem('token'));
            },
            success: function (response) {
                Swal.fire({
                    position: 'top-center',
                    type: 'success',
                    title: response.message,
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let data = jqXHR.responseJSON;
                Swal.close();

                $('#modal-task').modal('show');
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data.message
                });
            }
        });
    });
})();