//var ws = new WebSocket("ws://10.16.0.120:8080");
//var ws = new WebSocket("ws://localhost:8080");

var devicesIPs;

var wsHandler = {
    wsLocal: null,
    wsRemote: null,
    sendState: function(data) {
        this.wsLocal = new WebSocket("ws://localhost:8080");

        this.wsLocal.onopen = function() {
            wsHandler.wsLocal.send(data);
            wsHandler.wsLocal.close(1000, "State sent!");
        }

        this.wsLocal.onclose = function(evt) {
            console.log("Websocket - Close code: " + evt.code + ", Reason: " + evt.reason);
            wsHandler.wsLocal = null;
        }

        this.wsLocal.onerror = function(err) {
            console.log("Websocket - Error: " + err);
        }
    },
    getState: function(devID) {
                
        var idx = devicesIPs.findIndex(function(obj) {
            return obj.id == devID;
        });

        this.wsRemote = new WebSocket("ws://" + devicesIPs[idx].ip +":8080");

        this.wsRemote.onopen = function() {
            //console.log("Requesting state...");
            wsHandler.wsRemote.send("state");
        }

        this.wsRemote.onclose = function(evt) {
            console.log("Websocket - Close code: " + evt.code + ", Reason: " + evt.reason);
            wsHandler.wsRemote = null;
        }

        this.wsRemote.onerror = function(err) {
            console.log("Websocket - Error: " + err);
        }
    }
};
