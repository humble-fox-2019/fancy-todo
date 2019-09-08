const server_url = 'http://localhost:3000'
const default_pict = 'https://www.uic.mx/posgrados/files/2018/05/default-user.png'


function onSignIn( googleUser ) {
    let profile = googleUser.getBasicProfile();
    let idToken = googleUser.getAuthResponse().id_token

    $.ajax({
        type : "POST",
        url : `${server_url}/googleSignIn`,
        data: { idToken },
        success : function ( response ) {
            const { token } = response ;
            localStorage.setItem( "token" , token );
            localStorage.setItem( 'email' , profile.getEmail() )
            renderAppPage();
        }, 
        error : function ( err ) {
            console.log( "ERROR FROM onSignIn" );
            showError();
        }
    })
    
    
}


function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then( function () {
        console.log('User signed out.');
    });
    localStorage.removeItem('token');
    renderLoginPage();
}

