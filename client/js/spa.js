$(document).ready(()=>{
    
    //login checker
    if(!localStorage.getItem('token')){
        hideAll()
        $('#landing').show()
    } else {
        hideAll()
        $('#home').show()
        todoGetAll()
    }

    //get started click
    $('#getstarted').click(event => {
        event.preventDefault()
        hideAll()
        $('#login').show()
    })

    //register click
    $('#linkregister').click(event => {
        event.preventDefault()
        hideAll()
        $('#register').show()
    })

})