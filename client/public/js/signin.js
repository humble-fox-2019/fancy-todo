(() => {
    const baseUrl = "http://localhost:3000";

    $("#signin").bind("click", function () {
        $.ajax({
            type: "POST",
            url: baseUrl + '/signin',
            data: $("#frmSignIn").serialize(),
            success: function (response) {
                console.log(response);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus, errorThrown);
            }
        });
    });
})();