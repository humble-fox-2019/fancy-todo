function getProjects() {
    $.ajax({
        type: "GET",
        url: baseUrl + '/projects/user/' + status,
        beforeSend: function (request) {
            request.setRequestHeader("token", localStorage.getItem('token'));
        },
        success: function (response) {
            let data = '';
            $.each(response, (i, el) => {
                data += `<tr>
                            <td>${el.name}</td>
                            <td>${el.description}</td>
                            <td>
                                <button class="btn btn-primary btn-sm p-1" onclick="openProject('${el._id}')">open</button>
                                <button class="btn btn-info btn-sm p-1" onclick="editProject('${el._id}')">Edit</button>
                                <button class="btn btn-danger btn-sm p-1" onclick="leave('${el._id}')">leave</button>
                            </td>
                        </tr>`;
            });
            $("#datatables tbody").html(data);
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

var action = '';
function addProject() {
    action = 'add';

    $('#modal-project').modal('show');
    $('#modal-project .block-title').text('Add a new project');
    $('#modal-project form')[0].reset();
}

function editProject(projectId) {
    action = 'edit';
    $('#modal-project .block-title').text('Update project');

    $.ajax({
        type: "GET",
        url: baseUrl + '/projects/' + projectId,
        beforeSend: function (request) {
            request.setRequestHeader("token", localStorage.getItem('token'));
        },
        success: function (response) {
            $('#projectId').val(response._id);
            $('#name').val(response.name);
            $('#description').val(response.description);
            $('#modal-project').modal('show');
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

function saveProject() {
    $('#modal-project').modal('hide');
    Swal.showLoading();
    let url;
    if (action == 'add') {
        url = baseUrl + '/projects';
        type = 'POST';
    } else {
        url = baseUrl + '/projects/' + $('#projectId').val();
        type = 'PATCH';
    }

    $.ajax({
        type,
        url,
        data: $("#modal-project form").serialize(),
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

            getProjects();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            let data = jqXHR.responseJSON;
            Swal.close();

            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: data.message
            }).then((result) => {
                $('#modal-project').modal('show');
            })
        }
    });
}

function leave(projectId) {
    $.ajax({
        type: "DELETE",
        url: baseUrl + '/projects/leave/' + projectId,
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

            getProjects();
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

function openProject(projectId) {
    localStorage.setItem('projectId', projectId);
    window.location.href = "#projects-active"
}