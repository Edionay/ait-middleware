// Starts handoff process.
function startHandoff(userLocation) {
    //console.log("Browser event received.");
    console.log("Current user location: " + userLocation);
    userLocationRef.set(userLocation);
}

/*var ipPut = '13.37.0.2:10338';
var ipGet = null;*/
var ipPut = 'localhost:10338';
var ipGet = 'localhost:10338';
var getDone = true;
// Get state form AIT Cyclon.
function getSessionState() {
    var xhttp = new XMLHttpRequest();

    console.log("Getting session state from: " + ipGet);
    xhttp.open('GET', 'http://' + ipGet + '/session', true);

    xhttp.onreadystatechange = function() {
        if(xhttp.status == 200) {
            if(xhttp.response == "" || getDone) {
                //console.log("xhttp.response == \"\" or getDone == true");
                console.log("Empty response or session state has already been gotten.");
                return;
            }

            var parserError = false;
            try {
                var res = JSON.parse(xhttp.response);
                var data = JSON.parse(res.session);
            }
            catch(err) {
                console.log("Parser error: " + err);
                parserError = true;
            }
            if(parserError) {
                return;
            }

            console.log("State received = ");
            console.log(data);

            getDone = true;
            curDeviceRef.set({id: deviceID, init: 0}); // Update current device used.
        }
        else {
            var errorMsg = 'Error:\n';
            errorMsg += xhttp.status + ' ' + xhttp.statusText;
            console.log(errorMsg);
        }
    };
    
    getDone = false;
    xhttp.send();
}

var putDone = true;
// Send state to AIT Cyclon.
function putSessionState(data) {
    var xhttp = new XMLHttpRequest();

    xhttp.open('PUT', 'http://' + ipPut + '/session', true);

    xhttp.onreadystatechange = function() {
        if(xhttp.status == 200) {
            //var res = JSON.parse(xhttp.response);
            var res = xhttp.response;
            if(res == "" || putDone) {
                //console.log("res == \"\" or putDone == true");
                console.log("Empty response or session state has already been put.");
                return;
            }
            console.log(JSON.stringify(res));

            putDone = true;
            setTimeout(function() {
                appStateRef.set(data);
                //appStateRef.set(Math.random());
            }, 1000);
        }
        else {
            var errorMsg = 'Error:\n';
            errorMsg += xhttp.status + ' ' + xhttp.statusText;
            console.log(errorMsg);
        }
    };

    console.log("Putting " + data.length + " bytes (" + (data.length / 1024) + "kB) of data into: " + ipPut);
    putDone = false;
    xhttp.send(JSON.stringify({"session": data}));
}

// If something goes wrong.
function errorHandler(error) {
    console.log(error);
}

var locations = ["Bedroom", "Home Office", "Living Room", "Mobile", "Office"];
var locationsIdx = 0;

var urls = ["https://www.google.com.br/", "http://www.mvnrepository.com/",
            "https://www.gradle.org/", "http://www.cplusplus.com/reference/",
            "https://www.w3schools.com/"];
var urlIdx = 1;

function sendPageState() {
    var dummyState = [];
    dummyState.push(urls[urlIdx++]);
    dummyState.push(deviceID);
    for(var i = 0; i < 8; i++) {
        dummyState.push(Math.floor(Math.random() * (101 - 1)) + 1);
    }
    putSessionState(JSON.stringify(dummyState));
}

var deviceID = (Math.floor(Math.random() * (10001 - 1)) + 1);
var currentDevice;
var targetDevice;

curDeviceRef.set({id: deviceID, init: 1});

setTimeout(function() {
    if(deviceID != currentDevice.id)
        trgDeviceRef.set(deviceID);

    setInterval(function() {
        
        if(urlIdx == urls.length)
            urlIdx = 0;
        
        setTimeout(function() {
            startHandoff(locations[locationsIdx++]);
            if(locationsIdx == locations.length)
                locationsIdx = 0;
        }, 10000);
    }, 20000);
}, 5000);
