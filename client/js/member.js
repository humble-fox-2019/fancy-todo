let dataTemp = [] // tampungan
let dataTempBefore = [] /// tampungan untuk di masukkan ke db
// before-user-m
if(dataTempBefore.length >= 1){
   $('#before-user-m').show()
}else {
    $('#before-user-m').hide()
}
$("#member-name").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    if(value.length >= 1){
        $('#list-current-user').empty()
        // console.log(dataTemp , ' di on key up')
        dataTemp.forEach(e => {
            if(e.name.toLowerCase().indexOf(value) > -1){
                // console.log(e , ' -------,,,,,,,,,,,,,,,,,,,,<<<<<<<<<')
                $('#list-current-user').prepend(
                    `<a href="#" onclick="AddToArr('${e.name}','${e._id}')">${e.name}</a>`
                )
            }
        });
        $('#list-current-user').filter(function(){
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        })
    }else {
        $('#list-current-user').empty()
    }
  });
  RenderMember()
function RenderMember(){
    dataTempBefore = []
    // console.log(dataTemp ,' before')
    // dataTemp = []
    $.ajax({
        url : "http://localhost:3000/project/AllUser",
        method : 'GET',
        headers : {
            token : localStorage.getItem('token')
        }
    })
    .done(function(data){
        dataTemp =  data
        // console.log(dataTemp , ' after')
        // dataTemp =  data.listUserName
        // idTemp = data.listId
    })
    .fail(function(jqXHR, textStatus) {
        console.log('Error:', textStatus);
      });
}

function AddToArr (name,id){
    // console.log(name , id)
    dataTemp = dataTemp.filter(el => el.name != name && el._id != id )
    dataTempBefore.push({
        name ,  id
    })
    // console.log(name , id , ' di ADD TO ARR')
    RenderBefore(name , id)
    console.log(dataTempBefore , ' DI ADD TO ARR !!!!!!!!!!!!!!!')
}

// RenderBefore()
function RenderBefore(name,id){
    // console.log(dataTempBefore)
    let fn = dataTempBefore[dataTempBefore.length -1]
    // console.log(fn , ' INI FN<<<<<<<<<')
    if(dataTempBefore.length >= 1){
        $('#before-user').append(`
        <p class="mr-2 ml-1 detail-user-input"><a href="#" onclick="deleteFromList('${fn.name}','${fn.id}' )">X<a/>${fn.name}</p>
        `) 
    }
    $('#list-current-user').empty()
    $('#before-user-m').show()
    // console.log(dataTempBefore , ' di fn Render Before')
    // console.log($('#before-user'))
    // console.log(dataTempBefore)
}

function deleteFromList(name , id){
    dataTempBefore = dataTempBefore.filter(el => el.name != name && el.id != id  )
    // console.log(dataTempBefore , ' di fn delete from list ==============')
    // console.log(name ,  id , '  herre == == =  = DELETE FROM LIST')   
    dataTemp.push({
        name , _id : id
    })
    if(dataTempBefore.length <= 0){
        $('#before-user-m').hide()
    }
    // RenderBefore()
    RenderUlang()
}

function RenderUlang (){
    $('#before-user').empty()
    if(dataTempBefore.length >= 1){
        // console.log(dataTempBefore , ' di render ulang =++++++++ --------')
        dataTempBefore.forEach(fn=>{
            $('#before-user').append(`
            <p class="mr-2 ml-1 detail-user-input"><a href="#" onclick="deleteFromList('${fn.name}','${fn.id}' )">X<a/>${fn.name}</p>
            `) 
        })
    }
}



$('#input-project-form').submit(function(){
    event.preventDefault();
    // console.log($('#project-name').val())
    // console.log($('#project-des').val())
    // console.log($('#datepicker2').val())
    // console.log(dataTempBefore);
    $.ajax({
        url: 'http://localhost:3000/project',
      method: 'POST',
      data: {
        name: $('#project-name').val(),
        des: $('#project-des').val(),
        date : $('#datepicker2').val(),
        member : JSON.stringify(dataTempBefore)
      },
      headers : {
        token : localStorage.token
      }
    })
    .done(function(data){
        $('#project-name').val('')
        $('#project-des').val('')
        $('#datepicker2').val('')
        $("#member-name").val('')
        dataTempBefore = []
        dataTemp = []
        RenderMember()
        // RenderUlang()
        $('#before-user').empty()
        $('#before-user-m').hide()
        Swal.fire(
            'Succes Add Project',
            'You clicked the button!',
            'success'
          )
        // console.log(data)
    })
    .fail(function(err){
        console.log(err)
    })
})

