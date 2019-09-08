(() => {
    const baseUrl = "http://localhost:3000";

    $("#signup").bind("click", function () {

        if ($('#signup-terms').is(":checked")) {
            $.ajax({
                type: "POST",
                url: baseUrl + '/signup',
                data: $("#frmsignup").serialize(),
                success: function (response) {
                    Swal.fire({
                        position: 'top-center',
                        type: 'success',
                        title: "Sign Up successfully",
                        showConfirmButton: false,
                        timer: 1500
                    })

                    window.location.href = "#signin";
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
        } else {
            Swal.fire({
                position: 'top-center',
                type: 'error',
                title: "Please checked 'I agree to Terms & Conditions'",
                showConfirmButton: false,
                timer: 1500
            })
        }
    });
})();