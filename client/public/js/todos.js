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
})();

function formatDate(date) {
    let monthNames = ['',
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ];
    newDate = date.split('-');

    let day = newDate[2];
    let year = newDate[0];

    return (date === getToday()) ? 'Today' : day + ' ' + monthNames[Number(newDate[1])] + ' ' + year;
}

function getToday() {
    const today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}

function removeTodo(todoId) {
    $('#row' + todoId).addClass('animated fadeOutLeft');

    $.ajax({
        type: "DELETE",
        url: baseUrl + '/todos/' + todoId,
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
            })
        }
    });
}

function checkedTodo(todoId, status = true) {
    $('#row' + todoId).addClass('animated fadeOutUp');

    $.ajax({
        type: "PATCH",
        url: baseUrl + '/todos/' + todoId,
        data: {
            status: status
        },
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
            })
        }
    });
}

var action = '';
function add() {
    action = 'add';

    $('#modal-task').modal('show');
    $('#modal-task .block-title').text('Add a new task');
    $('#modal-task form')[0].reset();
}

function edit(todoId) {
    action = 'edit';
    $('#modal-task .block-title').text('Update task');

    $.ajax({
        type: "GET",
        url: baseUrl + '/todos/' + todoId,
        beforeSend: function (request) {
            request.setRequestHeader("token", localStorage.getItem('token'));
        },
        success: function (response) {
            $('#todoId').val(response._id);
            $('#name').val(response.name);
            $('#description').val(response.description);
            $('#dueDate').val(response.dueDate.slice(0, 10));
            $('#modal-task').modal('show');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            let data = jqXHR.responseJSON;
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: data.message
            })
        }
    });
}

function save() {
    $('#modal-task').modal('hide');
    Swal.showLoading();
    let url;
    if (action == 'add') {
        url = baseUrl + '/todos';
        type = 'POST';
    } else {
        url = baseUrl + '/todos/' + $('#todoId').val();
        type = 'PATCH';
    }

    $.ajax({
        type,
        url,
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
}

function getTodos(status = 'all') {

    if (location.hash === "#todos-active") {
        status = "active";
    }

    if (location.hash === "#todos-completed") {
        status = "completed";
    }

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
                    if (location.hash === "#todos-active") {
                        templateTask += `
                            <div class="js-task block block-rounded mb-5 animated fadeIn" data-task-id="${el2._id}" id="row${el2._id}"
                                data-task-completed="false" data-task-starred="false">
                                <table class="table table-borderless table-vcenter mb-0">
                                    <tr>
                                        <td class="text-center" style="width: 50px;">
                                            <label
                                                class="js-task-status css-control css-control-primary css-checkbox py-0">
                                                <input type="checkbox" class="css-control-input" onclick="checkedTodo('${el2._id}', true)">
                                                <span class="css-control-indicator"></span>
                                            </label>
                                        </td>
                                        <td class="js-task-content font-w600">
                                            ${el2.name}
                                        </td>
                                        <td class="text-right" style="width: 100px;">
                                            <button class="js-task-star btn btn-sm btn-alt-info" type="button" onclick="edit('${el2._id}')">
                                                <i class="fa fa-pencil"></i>
                                            </button>
                                            <button class="js-task-remove btn btn-sm btn-alt-danger" type="button" onclick="removeTodo('${el2._id}')">
                                                <i class="fa fa-times"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </table>
                            </div>`;
                    }

                    if (location.hash === "#todos-completed") {
                        templateTask += `<div class="js-task block block-rounded mb-5 animated fadeIn" data-task-id="${el2._id}" id="row${el2._id}"
                            data-task-completed="true" data-task-starred="false">
                            <table class="table table-borderless table-vcenter bg-body-light mb-0">
                                <tr>
                                    <td class="text-center" style="width: 50px;">
                                        <label class="js-task-status css-control css-control-primary css-checkbox py-0">
                                            <input type="checkbox" class="css-control-input" checked onclick="checkedTodo('${el2._id}', false)">
                                            <span class="css-control-indicator"></span>
                                        </label>
                                    </td>
                                    <td class="js-task-content font-w600">
                                        <del>${el2.name}</del>
                                    </td>
                                    <td class="text-right" style="width: 100px;">
                                        <button class="js-task-star btn btn-sm btn-alt-info" type="button" onclick="edit('${el2._id}')">
                                            <i class="fa fa-pencil"></i>
                                        </button>
                                        <button class="js-task-remove btn btn-sm btn-alt-danger" type="button" onclick="removeTodo('${el2._id}')">
                                            <i class="fa fa-times"></i>
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>`;
                    }
                })

                templateTask += `</div > `;
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