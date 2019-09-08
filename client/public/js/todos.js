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