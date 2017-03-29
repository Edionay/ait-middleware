var serverUrl = 'http://10.16.0.120:8080';

function getAllThings() {
    var xhttp = new XMLHttpRequest();

    xhttp.open('GET', serverUrl + '/things', true);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("textarea").value = JSON.stringify(JSON.parse(xhttp.response), null, 2);
        }
        else {
            var errorMsg = 'Error:\n';
            errorMsg += xhttp.status + ' ' + xhttp.statusText;
            document.getElementById("textarea").value = errorMsg;
        }
    };

    xhttp.send();
}

function getThing() {
    var thingId = document.getElementById("thingId").value;
    var xhttp = new XMLHttpRequest();

    var thingUrl = serverUrl + '/things/' + thingId;

    xhttp.open('GET', thingUrl, true);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            document.getElementById("textarea").value = JSON.stringify(JSON.parse(xhttp.response), null, 2);
        }
        else {
            var errorMsg = 'Error:\n';
            errorMsg += xhttp.status + ' ' + xhttp.statusText;
            document.getElementById("textarea").value = errorMsg;
        }
    };

    xhttp.send();
}

function getToken() {
    var xhttp = new XMLHttpRequest();
    
    xhttp.open('POST', serverUrl + '/oauth/token?grant_type=client_credentials', true);
    xhttp.setRequestHeader('Authorization', 'Basic ' + window.btoa('1855NOAMBJ4TU3FYDQ6IM0M2E:CuVDWJT++PPgp2TY92VqNX7/wTWxS3mR+rzySggG3yA'));

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.response);
            var accessToken = res.access_token;
            
            document.getElementById("textarea").value = JSON.stringify(res, null, 2);
            
            var d = new Date();
            d.setTime(d.getTime() + (24*60*60*1000)); // Time unit is miliseconds.
            var expires = "expires=" + d.toUTCString();
            document.cookie = "accessToken=" + accessToken + ";" + expires;
        }
    };
    
    xhttp.send();
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    
    return "";
}
    
function addThing() {
    var value = document.getElementById("value").value;

    var accessToken = getCookie('accessToken');
    if(accessToken == "") {
        document.getElementById("textarea").value = 'No token found!!';
        return;
    }

    var xhttp = new XMLHttpRequest();
    
    xhttp.open('POST', serverUrl + '/things', true);
    xhttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.response);
            document.getElementById("textarea").value = JSON.stringify(res, null, 2);
        }
        else {
            var errorMsg = 'Error:\n';
            errorMsg += xhttp.status + ' ' + xhttp.statusText;
            document.getElementById("textarea").value = errorMsg;
        }
    };
    
    xhttp.send(JSON.stringify({thing: value}));
}

function deleteThing() {
    var thingId = document.getElementById("thingId").value;
    
    var accessToken = getCookie('accessToken');
    if(accessToken == "") {
        document.getElementById("textarea").value = 'No token found!!';
        return;
    }

    var thingUrl = serverUrl + '/things/' + thingId;

    var xhttp = new XMLHttpRequest();
    
    xhttp.open('DELETE', thingUrl, true);
    xhttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.response);
            document.getElementById("textarea").value = JSON.stringify(res, null, 2);
        }
        else {
            var errorMsg = 'Error:\n';
            errorMsg += xhttp.status + ' ' + xhttp.statusText;
            document.getElementById("textarea").value = errorMsg;
        }
    };
    
    xhttp.send();
}

function getProfile() {
    var accessToken = getCookie('accessToken');
    if(accessToken == "") {
        document.getElementById("textarea").value = 'No token found!!';
        return;
    }

    var xhttp = new XMLHttpRequest();
    
    xhttp.open('GET', serverUrl + '/me', true);
    xhttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);

    xhttp.onreadystatechange = function() {
        if(xhttp.readyState == 4 && xhttp.status == 200) {
            var res = JSON.parse(xhttp.response);
            document.getElementById("textarea").value = JSON.stringify(res, null, 2);
        }
        else {
            var errorMsg = 'Error:\n';
            errorMsg += xhttp.status + ' ' + xhttp.statusText;
            document.getElementById("textarea").value = errorMsg;
        }
    };
    
    xhttp.send();
}
