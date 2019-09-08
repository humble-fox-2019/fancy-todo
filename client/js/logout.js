function logout() {
    localStorage.removeItem('token')
    clearEverything()
    checkSignedIn()
}

function clearEverything() {
    $('.card-columns').empty()
}