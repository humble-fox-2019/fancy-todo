function logout() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token')
    clearEverything()
    checkSignedIn()
}

function clearEverything() {
    $('.card-columns').empty()
}