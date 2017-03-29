// Device ID on which this browser instance is running.
var deviceID = -1;

// Retrieving device ID from local storage.
chrome.storage.local.get('aitDeviceID', function(items) {
    if(items.aitDeviceID !== undefined)
        deviceID = items.aitDeviceID;
});

// All devices registred by the user.
var devices;

// Checks if an input ID exists. If it does, sets it at the local storage.
function checkDeviceID(devID) {
    var idx = devices.findIndex(function(device) {
        return devID == device.id;
    });
    
    if(idx != -1) {
        deviceID = devID;
        chrome.storage.local.set({'aitDeviceID': deviceID});
    }
}

// Device ID and application ID that are being used.
var currentDevApp;

// Updates server with the ID of the current device being used by the user.
function currentDevice(appID) {
    if(deviceID != -1)
        currentDeviceRef.set({"deviceID": deviceID, "application": appID});
}

// User's preferences entries.
var userPreferences;

// ID of the handoff target device.
var targetID;

// Locations registred by the user.
var locations = ["Bedroom", "Home Office", "Living Room", "Mobile", "Office"];

// Device types registred by the user.
var devicesType = ["Any", "Desktop PC", "Laptop", "Smartphone", "SmartTV", "Tablet"];

// Chooses a device as the handoff target.
function chooseTargetDevice(userLocation) {
    var appIdx = userPreferences.findIndex(function(preference) {
        return currentDevApp.application == preference.application;
    });

    if(appIdx == -1)
        return -1;

    var devIdx = userPreferences[appIdx].preferences.findIndex(function(pref) {
        return userLocation == locations[pref.location];
    });

    if(devIdx == -1)
        return -1;
    
    var dev = userPreferences[appIdx].preferences[devIdx].device;
    
    if(dev[0].indexOf("id") == 0)
        return dev[0].slice(5, dev[0].length);
    
    /* Otherwise, it will be necessary to choose a device which matches
     * the preferences the most. */
    var devicesBackup = devices;
    for(var idx in dev) {
        if(dev[idx].indexOf("type") == 0) {
            var devType = dev[idx].slice(7, dev[idx].length);
            devicesBackup = devicesBackup.filter(function(device) {
                return devType == devicesType[device.type];
            });
        }
        else if(dev[idx].indexOf("bat") == 0) {
            devicesBackup = devicesBackup.filter(function(device) {
                return (device.battery);
            });
        }
        else if(dev[idx].indexOf("key") == 0) {
            devicesBackup = devicesBackup.filter(function(device) {
                return (device.keyboard);
            });
        }
        else if(dev[idx].indexOf("width <=") == 0) {
            var devWidth = parseInt(dev[idx].slice(9, dev[idx].length));
            devicesBackup = devicesBackup.filter(function(device) {
                return device.width <= devWidth;
            });
        }
        else if(dev[idx].indexOf("height <=") == 0) {
            var devHeight = parseInt(dev[idx].slice(10, dev[idx].length));
            devicesBackup = devicesBackup.filter(function(device) {
                return device.height <= devHeight;
            });
        }
    }

    if(devicesBackup.length < 1)
        return -1;

    devicesBackup.sort(function(devA, devB) {
        return devA.width - devB.width;
    });

    if(dev.some(function(characteristic) {
        return characteristic == "width = smallest";
    })) {
        return devicesBackup[0].id;
    }
    else if(dev.some(function(characteristic) {
        return characteristic == "width = largest";
    })) {
        return devicesBackup[devicesBackup.length - 1].id;
    }

    devicesBackup.sort(function(devA, devB) {
        return devA.height - devB.height;
    });

    if(dev.some(function(characteristic) {
        return characteristic == "height = smallest";
    })) {
        return devicesBackup[0].id;
    }
    else if(dev.some(function(characteristic) {
        return characteristic == "height = largest";
    })) {
        return devicesBackup[devicesBackup.length - 1].id;
    }

    return devicesBackup[0].id;
}

/*
 * Reference to the Tab whose application session state will be migrated.
 * For type description, access https://developer.chrome.com/extensions/tabs#type-Tab.
 */
var mgtTab;

// Full application state, i.e, union of HTML DOM, JS Document and Cookies.
var mgtTabState = null;

// Starts handoff process.
function startHandoff(userLocation) {
    console.log("Browser event received.");
    console.log("Current user location: " + userLocation);
    userLocationRef.set(userLocation);
}

// Sends state through cloud service or websocket connection.
function transfer(domState, jsState) {
    var url = new URL(mgtTab.url);
    var domain = url.hostname;
    if(domain.indexOf("www") == 0)
        domain = domain.slice(domain.indexOf("."), domain.length);

    chrome.cookies.getAll({domain: domain}, function(cookies) {
        var appState = [];
        appState.push(jsState);
        appState.push(domState);
        appState.push(cookies);

        var data = JSON.stringify({"deviceID": deviceID, "url": mgtTab.url, "state": appState});

        // Send state to WebSocket server.
        //wsHandler.sendState(data);

        // Send state to the cloud service (Firebase).
        appStateRef.set(data);

        // Close Tab from all state data was retrieved
        chrome.tabs.remove(mgtTab.id);
    });
}

// Sends current state to content script at the active Tab.
function resume() {
    if(mgtTabState != null)
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {"resume": mgtTabState});
            mgtTabState = null;
        });
}

/*
 * Receives messages from the content script and popup script. Used as callback
 * for chrome.runtime.onMessage.addListener.
 * For parameter types description, access https://developer.chrome.com/extensions/runtime#event-onMessage.
 */
function onScriptMessage(message, sender, sendResponse) {
    console.log("Content script message received!");
    if(message.getID){
        sendResponse({devID: deviceID});
    }
    else if(message.setID) {
        checkDeviceID(message.setID);
    }
    else if(message.handoff) {
        startHandoff(message.handoff);
    }
    else if(message.domState) {
        transfer(message.domState, message.jsState);
    }
    else if(message.resume) {
        resume();
    }
    else if(message.focused) {
        currentDevice(message.focused);
    }
    else
        errorHandler("Could not call any function");
}

// Assign "onScriptMessage()" as a listener to messages from the content script and popup script.
chrome.runtime.onMessage.addListener(onScriptMessage);

// If something goes wrong.
function errorHandler(error) {
    console.log(error);
}
