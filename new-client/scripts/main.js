$(document).ready(function () {
  preventClick()

  checkToken()
  randomQuotes()
})

function preventClick() {
  $('a').click(function (event) {
    event.preventDefault()
  })

  $('button').click(function (event) {
    event.preventDefault()
  })
}

function navigate(params) {
  const pages = ['#start', '#login-page', '#register-page', '#todos', '.nav-button', '#logout-btn', '#edit-todo', '#quotes-container']

  pages.forEach(el => {
    if (params.includes(el)) $(el).css('display', 'flex')
    else $(el).hide()
  })
}

function checkToken() {
  const token = localStorage.getItem('token')

  if (token) {
    navigate(['#todos', '#logout-btn', '#quotes-container'])
    fetchTodos()
  } else {

  }
}

function randomQuotes() {
  setInterval((() => {
    $.ajax({
      method: 'GET',
      url: 'https://programming-quotes-api.herokuapp.com/quotes/random',
    })
      .done(quote => {
        console.log(quote);
        $('#random-quotes').empty()
        $('#random-quotes').append(
          `
          <p>${quote.en} -${quote.author}</p>
          `
        )
      })
      .fail(err => {
        console.log(err.responseJSON.message)
      })
  })(), 60000)
}