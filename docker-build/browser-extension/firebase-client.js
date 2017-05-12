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

// Reference to the ID of the current device being used.
var curDeviceRef = firebase.database().ref(baseURL + "/current-device");

// Reference to the ID of the device chosen as a handoff target.
var trgDeviceRef = firebase.database().ref(baseURL + "/target-device");

var firstCall = true;
appStateRef.on("value", function(snapshot) {
    if(firstCall) {
        console.log("Skiping first call!!!");
        firstCall = false;
        return;
    }
    
    if(deviceID == targetDevice)
        getSessionState();

}, errorHandler);

userLocationRef.on("value", function(snapshot) {
	//var data = snapshot.val();

    if(deviceID == currentDevice.id)
        sendPageState();

}, errorHandler);

curDeviceRef.on("value", function(snapshot) {
    currentDevice = snapshot.val();
    
    if(currentDevice.init == 0 && deviceID != currentDevice.id)
        trgDeviceRef.set(deviceID);

}, errorHandler);

trgDeviceRef.on("value", function(snapshot) {
    targetDevice = snapshot.val();
}, errorHandler);

// If something goes wrong.
function errorHandler(error) {
    console.log(error);
}
