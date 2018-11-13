angular.module('myApp', []).controller('userCtrl', function($scope, $http) {
    $scope.devicesType = ["Any", "Desktop PC", "Laptop", "Smartphone", "SmartTV", "Tablet"];
    $scope.locations = ["Bedroom", "Home Office", "Living Room", "Mobile", "Office"];
    $scope.devices = [];
    $scope.prefEntries = [];

    $scope.getDevices = function() {
        console.log("Getting devices from server...");
        $http.get('https://teste-ait-middleware.firebaseio.com/aitmiddleware/browser-extension/devices.json')
        .then(function (response) {
            if(response.data != null)
                $scope.devices = response.data;
        });
    }

    $scope.getPreferences = function() {
        console.log("Getting preferences from server...");
        $http.get('https://teste-ait-middleware.firebaseio.com/aitmiddleware/browser-extension/preferences.json')
        .then(function (response) {
            if(response.data != null)
                $scope.prefEntries = response.data;
        });
    }

    $scope.setPreferences = function() {
        console.log("Uploading preferences to server...");
        $http.put('https://teste-ait-middleware.firebaseio.com/aitmiddleware/browser-extension/preferences.json',
                $scope.prefEntries)
        .then(function(response) {
                // Success
                $scope.hideform = true;
            },
            function (response) {
                // Error
                console.log(response.statusText);
            }
        );
    }
    
    $scope.getDevices();
    $scope.getPreferences();

    $scope.appID = "Application ID or URL";
    $scope.deviceID = -1;
    $scope.selectedType = $scope.devicesType[0];
    $scope.width = 0;
    $scope.height = 0;
    $scope.battery = false;
    $scope.keyboard = false;
    $scope.location = $scope.locations[0];
    
    $scope.edit = false;
    $scope.error = false;
    $scope.hideform = true;
    
    $scope.editPreference = function(id) {
        $scope.hideform = false;

        if(id == 'new') {
            $scope.edit = false;

            $scope.width = 0;
            $scope.height = 0;
            $scope.battery = false;
            $scope.keyboard = false;

            $scope.appID = "Application ID or URL";
            $scope.deviceID = -1;
            $scope.selectedType = $scope.devicesType[0];
        }
        else {
            $scope.edit = true;

            $scope.width = 0;
            $scope.height = 0;
            $scope.battery = false;
            $scope.keyboard = false;

            $scope.appID = id;
            $scope.deviceID = -1;
            $scope.selectedType = $scope.devicesType[0];
        }
    };

    $scope.$watch('deviceID', function() {$scope.test();});
    $scope.$watch('width', function() {$scope.test();});
    $scope.$watch('height', function() {$scope.test();});

    $scope.test = function() {
        var checkID = function(device) {
            return device.id == $scope.deviceID;
        }
        
        if($scope.width < -1 ||  $scope.height < -1 || $scope.deviceID < -1
                || ($scope.deviceID > -1 && $scope.devices.findIndex(checkID) == -1)) {
            $scope.error = true;
        }
        else {
            $scope.error = false;
        }
    };

    $scope.registerPreference = function() {
        if($scope.error || $scope.appID === "Application ID or URL")
            return;

        var checkID = function(pref) {
            return $scope.appID == pref.application;
        }
        
        var checkLocation = function(pref) {
            return $scope.location == $scope.locations[pref.location];
        }

        var characteristics = function() {
            var dev = [];

            if($scope.deviceID != -1) {
                dev.push("id = " + $scope.deviceID);
                return dev;
            }

            if($scope.selectedType != "Any")
                dev.push("type = " + $scope.selectedType);

            if($scope.battery)
                dev.push("battery = true");

            if($scope.keyboard)
                dev.push("keyboard = true");

            switch($scope.width) {
                case -1:
                        dev.push("width = smallest");
                        break;

                case 0:
                        dev.push("width = largest");
                        break;

                default:
                        dev.push("width <= " + $scope.width);
            }
            
            switch($scope.height) {
                case -1:
                        dev.push("height = smallest");
                        break;

                case 0:
                        dev.push("height = largest");
                        break;

                default:
                        dev.push("height <= " + $scope.height);
            }

            return dev;
        }

        var appIdx = $scope.prefEntries.findIndex(checkID);
        // If there is not an entry for this application yet.
        if(appIdx == -1) {
            var newPreference = {
                application: $scope.appID,
                preferences: [
                    {
                        location: $scope.locations.indexOf($scope.location),
                        device: characteristics()
                    }
                ]
            };

            $scope.prefEntries.push(newPreference);
            $scope.setPreferences();
        }
        // If there is an entry for this application, but a new location entry will be added.
        else if($scope.prefEntries[appIdx].preferences.findIndex(checkLocation) == -1) {
            var newPreference = {
                location: $scope.locations.indexOf($scope.location),
                device: characteristics()
            };

            $scope.prefEntries[appIdx].preferences.push(newPreference);
            $scope.setPreferences();
        }
        // A location entry of an application entry, both already added, will be modified.
        else {
            var prefIdx = $scope.prefEntries[appIdx].preferences.findIndex(checkLocation);
            $scope.prefEntries[appIdx].preferences[prefIdx].device = characteristics();
            $scope.setPreferences();
        }

        $scope.appID = "Application ID or URL";
    }

    $scope.setModal = function(id) {
        $scope.hideform = true;
        $scope.appID = id;
    }

    $scope.removePreference = function() {
        var checkID = function(pref) {
            return $scope.appID == pref.application;
        }

        var appIdx = $scope.prefEntries.findIndex(checkID);

        $scope.prefEntries.splice(appIdx, 1);
        $scope.setPreferences();
        $scope.appID = "Application ID or URL";
    }

    $scope.printPreference = function(preference) {
        var str = "";
        for(var pref in preference) {
            str += $scope.locations[preference[pref].location] + "\n"
            for(var char in preference[pref].device)
                str += "\t" + preference[pref].device[char] + "\n";
        }
        return str;
    }
});
