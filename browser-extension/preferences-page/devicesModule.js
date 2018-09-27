angular.module('myApp', []).controller('userCtrl', function($scope, $http) {
    $scope.devicesType = ["Any", "Desktop PC", "Laptop", "Smartphone", "SmartTV", "Tablet"];
    $scope.locations = ["Bedroom", "Home Office", "Living Room", "Mobile", "Office"];
    $scope.devices = [];

    $scope.getDevices = function() {
        console.log("Getting devices from server...");
        $http.get('https://<DATABASE_NAME>.firebaseio.com/aitmiddleware/browser-extension/devices.json')
        .then(function (response) {
            if(response.data != null)
                $scope.devices = response.data;
        });
    }

    $scope.setDevices = function() {
        console.log("Uploading devices to server...");
        $http.put('https://<DATABASE_NAME>.firebaseio.com/aitmiddleware/browser-extension/devices.json',
                $scope.devices)
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

    $scope.deviceID = -1;
    $scope.selectedType = $scope.devicesType[0];
    $scope.width = 0;
    $scope.height = 0;
    $scope.battery = false;
    $scope.keyboard = false;
    $scope.location = $scope.locations[0];
    
    $scope.edit = false;
    $scope.deviceIndex = -1;
    $scope.error = false;
    $scope.hideform = true;
    
    $scope.editDevice = function(id) {
        $scope.hideform = false;

        if(id == 'new') {
            $scope.edit = false;

            $scope.width = 0;
            $scope.height = 0;
            $scope.battery = false;
            $scope.keyboard = false;
            
            $scope.deviceIndex = -1;
        }
        else {
            $scope.edit = true;

            var idx;
            for(idx in $scope.devices)
                if($scope.devices[idx].id == id) {
                    $scope.deviceIndex = idx;
                    break;
                }

            $scope.deviceID = $scope.devices[idx].id;
            $scope.selectedType = $scope.devicesType[$scope.devices[idx].type];
            $scope.width = $scope.devices[idx].width;
            $scope.height = $scope.devices[idx].height;
            $scope.battery = $scope.devices[idx].battery;
            $scope.keyboard = $scope.devices[idx].keyboard;
            $scope.location = $scope.locations[$scope.devices[idx].location];
        }
    };

    $scope.$watch('width', function() {$scope.test();});
    $scope.$watch('height', function() {$scope.test();});

    $scope.test = function() {
        if($scope.width < 1 ||  $scope.height < 1) {
            $scope.error = true;
        }
        else {
            $scope.error = false;
        }
    };

    // Returns an ID number between min (inclusive) and max (exclusive).
    $scope.createID = function(min, max) {
        var id;
        var checkID = function(device) {
            return device.id == id;
        }

        // If the created ID has already been added, then a new ID is created.
        do {
            id = Math.floor(Math.random() * (max - min)) + min;
        } while($scope.devices.findIndex(checkID) > -1);
        
        return id;
    }

    $scope.registerDevice = function() {
        if($scope.error)
            return;

        if($scope.deviceIndex == -1) {
            var device = {
                id: $scope.createID(1, 1001),
                type: $scope.devicesType.indexOf($scope.selectedType),
                width: $scope.width,
                height: $scope.height,
                battery: $scope.battery,
                keyboard: $scope.keyboard,
                location: $scope.locations.indexOf($scope.location)
            };

            $scope.devices.push(device);
            $scope.setDevices();
        }
        else if($scope.deviceIndex > -1 && $scope.deviceIndex < $scope.devices.length) {
            $scope.devices[$scope.deviceIndex].width = $scope.width;
            $scope.devices[$scope.deviceIndex].height = $scope.height;
            $scope.devices[$scope.deviceIndex].battery = $scope.battery;
            $scope.devices[$scope.deviceIndex].keyboard = $scope.keyboard;
            $scope.devices[$scope.deviceIndex].location = $scope.locations.indexOf($scope.location);

            $scope.setDevices();
        }
        
        $scope.deviceIndex = -1;
    }

    $scope.setModal = function(id) {
        $scope.hideform = true;
        var idx;
        for(idx in $scope.devices)
            if($scope.devices[idx].id == id) {
                $scope.deviceID = $scope.devices[idx].id;
                $scope.selectedType = $scope.devicesType[$scope.devices[idx].type];
                $scope.width = $scope.devices[idx].width;
                $scope.height = $scope.devices[idx].height;
                $scope.battery = $scope.devices[idx].battery;
                $scope.keyboard = $scope.devices[idx].keyboard;
                $scope.location = $scope.locations[$scope.devices[idx].location];

                $scope.deviceIndex = idx;
            }
    }

    $scope.removeDevice = function() {
        if($scope.deviceIndex > -1 && $scope.deviceIndex < $scope.devices.length) {
            $scope.devices.splice($scope.deviceIndex, 1);
            $scope.setDevices();
        }
        $scope.deviceIndex = -1;
    }
});
