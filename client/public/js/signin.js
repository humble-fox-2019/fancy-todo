(() => {
    const baseUrl = "http://localhost:3000";
    $("#signin").bind("click", function () {
        $.ajax({
            type: "POST",
            url: baseUrl + '/signin',
            data: $("#frmSignIn").serialize(),
            success: function (response) {
                localStorage.setItem('token', response.token);
                window.location.href = "#todos-active"
            },
            error: function (jqXHR, textStatus, errorThrown) {

                let data = jqXHR.responseJSON;
                Swal.fire({
                    position: 'top-end',
                    type: 'error',
                    title: data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        });
    });
})();