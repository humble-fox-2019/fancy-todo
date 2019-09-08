$(document).ready(() => {
    generateCards()
    $('#loginSubmit').click(() => {
        setTimeout(() => {
            generateCards()
        }, 500);
    })
})

function generateCards() {
    if (localStorage.getItem('token')) {
        $.ajax({
            type: 'GET',
            url: "http://localhost:3000/todos",
            headers: { "token": localStorage.getItem('token') }
        })
            .done((todos) => {
                clearEverything()
                $.each(todos, (index, value) => {
                    $('.card-columns').append(cardConstructor(value))
                })
            })
            .fail(err => {
                console.log(err)
                // do something else
            })
            .always(() => {
                $("abbr.timeago").timeago()
                console.log("Ajax process done")
            });
    }
}