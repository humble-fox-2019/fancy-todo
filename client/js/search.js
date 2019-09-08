$(document).ready(() => {
    $('#searchForm').submit((e) => {
        e.preventDefault()
        console.log($('#searchSubmit').val())
        $.ajax({
            type: 'GET',
            url: "http://localhost:3000/todos/filter?q=" + $('#searchSubmit').val(),
            headers: { "token": localStorage.getItem('token') }
        })
            .done((todos) => {
                clearEverything()
                console.log("Success Search")
                $.each(todos, (index, value) => {
                    $('.card-columns').append(cardConstructor(value))
                })
            })
            .fail(err => {
                console.log(err)
            })
            .always(() => console.log("Ajax process done"));
    })
})