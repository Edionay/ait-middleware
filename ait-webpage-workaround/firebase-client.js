// Setting up Firebase client.
var config = {
    apiKey: "AIzaSyDEGqW511fi37pici31XMZiYAx-tWCnuGs",
    authDomain: "fiery-inferno-5459.firebaseapp.com",
    databaseURL: "https://fiery-inferno-5459.firebaseio.com",
    storageBucket: "",
    messagingSenderId: "1019857638564"
};
firebase.initializeApp(config);

var baseURL = "aitmiddleware/browser-extension";

// Reference to the latest uploaded application interaction session state.
var appStateRef = firebase.database().ref(baseURL + "/app-state");

// Reference to user location.
var userLocationRef = firebase.database().ref(baseURL + "/user-location");

var firstCall = true;
appStateRef.on("value", function (snapshot) {
    if(firstCall) {
        console.log("Skiping first call!!!");
        firstCall = false;
        return;
    }
    getSessionState();
}, errorHandler);

userLocationRef.on("value", function (snapshot) {
	var data = snapshot.val();

    sendPageState();
}, errorHandler);

// If something goes wrong.
function errorHandler(error) {
    console.log(error);
}
