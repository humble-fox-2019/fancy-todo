function showError() {
    Swal.fire({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
    })
}

function showErrorMessage( error ) {
    Swal.fire({
        type: 'error',
        title: 'Error',
        text: error
    })   
}

function showSuccessMessage( title, message ) {
    Swal.fire(
        title,
        message,
        'success'
    )   
}
function generateQuotes( ) {
    $.ajax({
        method:"GET",
        url :'https://favqs.com/api/qotd',
        success : function ( response ) {
            const { author , body } = response.quote;
            $('#quotes').html( `"${body}"` )
            $('#quotes-author').html( `By : ${author}` )
        },
        error : function (err) {
            $('#quotes').html( err )
        }
    })
}

function convertRemaining( date ) {
    let date1 = new Date();
    let date2 = new Date( date );

    let Difference_In_Time = date2.getTime() - date1.getTime(); 
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24); 
    if ( Math.ceil(Difference_In_Days) < 0 ) {
        return '- '
    }
    return `${ Math.ceil(Difference_In_Days)} `
}