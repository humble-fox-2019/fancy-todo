var baseUrl = "http://localhost:3000";

(() => {

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

                getTodos();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                let data = jqXHR.responseJSON;
                Swal.close();

                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: data.message
                }).then((result) => {
                    $('#modal-task').modal('show');
                })
            }
        });
    });
})();

function formatDate(date) {
    let monthNames = ['',
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    date = date.split('-');

    let day = date[2];
    let year = date[0];

    return day + ' ' + monthNames[Number(date[1])] + ' ' + year;
}

function getTodos(status = 'all') {
    $.ajax({
        type: "GET",
        url: baseUrl + '/todos/user/' + status,
        beforeSend: function (request) {
            request.setRequestHeader("token", localStorage.getItem('token'));
        },
        success: function (response) {
            let groupingByDate = [];

            let tmpDate = '';
            let tmpObj = {
                date: '',
                todo: []
            };
            $.each(response, function (index, el) {
                let date = el.dueDate.slice(0, 10);
                if (index === 0) {
                    tmpDate = date
                    tmpObj.date = tmpDate;
                    tmpObj.todo.push(el);
                } else if (date === tmpDate) {
                    tmpObj.todo.push(el);
                } else if (date != tmpDate) {
                    groupingByDate.push(tmpObj);

                    tmpDate = date
                    tmpObj = {
                        date: date,
                        todo: [el]
                    };
                }

                if (index === response.length - 1) {
                    groupingByDate.push(tmpObj);
                }
            });

            let templateTask = '';
            $.each(groupingByDate, function (index, el) {
                templateTask += `
                <h2 class="content-heading mb-10">${formatDate(el.date)}</h2>
                        <div class="js-task-list">`;

                $.each(el.todo, function (index2, el2) {
                    templateTask += `<!-- Task -->
                            <div class="js-task block block-rounded mb-5 animated fadeIn" data-task-id="9"
                                data-task-completed="false" data-task-starred="false">
                                <table class="table table-borderless table-vcenter mb-0">
                                    <tr>
                                        <td class="text-center" style="width: 50px;">
                                            <label
                                                class="js-task-status css-control css-control-primary css-checkbox py-0">
                                                <input type="checkbox" class="css-control-input">
                                                <span class="css-control-indicator"></span>
                                            </label>
                                        </td>
                                        <td class="js-task-content font-w600">
                                            ${el2.name}
                                        </td>
                                        <td class="text-right" style="width: 100px;">
                                            <button class="js-task-star btn btn-sm btn-alt-info" type="button">
                                                <i class="fa fa-eye"></i>
                                            </button>
                                            <button class="js-task-remove btn btn-sm btn-alt-danger" type="button">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <!-- END Task -->`;
                })

                templateTask += `</div>`;
            });

            $('#displayTask').html(templateTask);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            let data = jqXHR.responseJSON;

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: data.message
            });
        }
    });
}