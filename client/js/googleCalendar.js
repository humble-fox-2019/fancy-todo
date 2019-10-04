// Client ID and API key from the Developer Console
var CLIENT_ID = '1075139297559-k7it3o7qfuvahtvn1n8vd0vbpabvpufg.apps.googleusercontent.com';
var API_KEY = 'AIzaSyDOvM6UIe_3DnMawJG0dVay3xEu57EPZV0';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = "https://www.googleapis.com/auth/calendar";

// var authorizeButton = $('#btnAddToCalendar');
// var signoutButton = $('#btnSignOut');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        
        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        // authorizeButton.onclick = handleAuthClick;
        // signoutButton.onclick = handleSignoutClick;
    }, function(error) {
        console.log(JSON.stringify(error, null, 2));
    });
}

/**
*  Called when the signed in status changes, to update the UI
*  appropriately. After a sign-in, the API is called.
*/
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        $('#btnAddToCalendar').show();
        $('#btnAuthorize').hide();
        // authorizeButton.style.display = 'none';
        // signoutButton.style.display = 'block';
        // listUpcomingEvents();
        // createEvent();
    } else {
        // $('#btnAddToCalendar').hide();
        $('#btnAuthorize').show();
        // authorizeButton.style.display = 'block';
        // signoutButton.style.display = 'none';
    }
}

/**
*  Sign in the user upon button click.
*/
function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
*  Sign out the user upon button click.
*/
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function createEvent() {
    const name = $('#todoName').val()
          description = $('#description').val()
          due_date = $('#due_date').val();

    let dateString = due_date ? new Date(due_date).toISOString() : '';

    console.log(name, description, dateString)
    var event = {
        'summary': name,
        'description': description,
        'start': {
            'dateTime': dateString,
            'timeZone': 'Asia/Jakarta'
        },
        'end': {
            'dateTime': dateString,
            'timeZone': 'Asia/Jakarta'
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
            ]
        }
    };
    
    var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event
    });
    
    request.execute(function(event) {
        let message =`Event added to Google Calendar: \n ${event.htmlLink}`;
        console.log(message);
        
        promptMessage(message);
    });
}