

function putTodosToContent(){
    $('.content').empty()
    $.ajax({
        method: 'get',
        url: 'http://localhost:3000/todos/',
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(todos =>{

        $.each(todos, function(index, value){
            $('.content').append(`
            <div id="${index}" style="padding-bottom: 10px;">
                <label for="title${index}">Title</label>
                <input type="text" id="title${index}" value="${value.todo}">
                <label for="description${index}">Description</label>
                <input type="text" id="description${index}" value="${value.description}">
                <label for="tag${index}">Tag</label>
                <input type="text" id="tag${index}" value="${value.tags}">
                <label for="tag${index}">done? check this box</label>
                <input type="checkbox" id="status${index}">
                <input type="button" id="delete${index}" value="delete">
                <br>
            </div>

            `)    
            
            if(value.status) { $(`#status${index}`).prop('checked', true) }
            $(`#delete${index}`).click(()=>{
                deleteTodo(value._id)
                $(`.content #${index}`).remove()

            })
            $(`#title${index}, #description${index}, #tag${index}`).keyup(()=>{
                upateTodo(value._id, $(`#title${index}`).val(), 
                $(`#description${index}`).val(), $(`#tag${index}`).val(), 
                $(`#status${index}`).val())
            })
            $(`#status${index}`).click(()=>{
                upateTodo(value._id, $(`#title${index}`).val(), 
                $(`#description${index}`).val(), $(`#tag${index}`).val(), 
                $(`#status${index}`).is(':checked'))
            })

          

        })
    })
    .catch(err => {
        console.log(err)
        $('.secondPage').hide()
        iWantLogin()
    })
}

function registerTodo(){
    
    $.ajax({
        method: 'post',
        url: 'http://localhost:3000/todos/',
        data: {
            todo: $('#todoTitle').val(),
            description: $('#todoDescription').val(),
            tags: $('#todoTag').val()
        },
        headers: { token: localStorage.getItem('token') }
    })
    .then(status => {
        $('.registerTodo').hide()
        $('#todoTitle').val("")
        $('#todoDescription').val("")
        $('#todoTag').val("")
        putTodosToContent()
        $('.boxFirst').show()
    })
    .catch(err => {
        console.log(err)
    })
}

function deleteTodo(id){
    $.ajax({
        method: 'delete',
        url: `http://localhost:3000/todos/${id}`,
        headers: { token: localStorage.getItem('token') }
    })
}

function upateTodo(id, todo, description, tags, status){
    $.ajax({
        method: 'patch',
        url: `http://localhost:3000/todos/${id}`,
        headers: { token: localStorage.getItem('token') },
        data:{
            todo,
            description,
            tags,
            status
        }
    })
    .then(newOne =>{
        console.log('updated')
    })
    .catch(err =>{
        console.log(err)
    })
}
function openTodoRegister(){
    $('.boxFirst').hide()
    $('.registerTodo').show()
}
function cancelRegister(){
    $('.registerTodo').hide()
    $('#todoTitle').val("")
    $('#todoDescription').val("")
    $('#todoTag').val("")
    $('.boxFirst').show()
}