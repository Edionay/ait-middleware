chrome.runtime.sendMessage({"getID": " "}, function(response) {
    document.getElementById("devID").value = response.devID;
});

document.addEventListener("click", (e) => {
    if(e.target.classList.contains("setID")) {
        chrome.runtime.sendMessage({"setID": document.getElementById("devID").value});
    }
    else if(e.target.classList.contains("handoff")) {
        chrome.runtime.sendMessage({"handoff": document.getElementById("userLocation").value});
    }
    else if(e.target.classList.contains("preferences")) {
        var url = 'http://10.16.0.120:9000/preferences.html';
        chrome.tabs.create({"url": url});
    }
});
