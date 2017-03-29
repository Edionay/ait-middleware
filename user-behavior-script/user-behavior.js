const CDP = require('chrome-remote-interface');

CDP((client) => {
    // extract domains
    const {Network, Page, Runtime} = client;
    
    // setup handlers
    Network.requestWillBeSent((params) => {
        console.log('>> Request -- id: ' + params.requestId + ' -- URL: ' + params.request.url);
    });
    
    Network.responseReceived((params) => {
        console.log('<< Response -- id: ' + params.requestId + ' -- URL: ' + params.response.url);
        console.log('   -- status: ' + params.response.status + ' -- statusText: ' + params.response.statusText);
        console.log('   -- mimeType: ' + params.response.mimeType + ' -- encodedDataLength: ' + params.response.encodedDataLength);
        
        /*Network.getResponseBody({requestId: params.requestId}, function(base64Encoded, body) {
            console.log('Base64Encoded: ' + base64Encoded + '\nBody:\n' + JSON.stringify(body));
            //console.log('Cookies:\n' + JSON.stringify(Network.getAllCookies()));
        });*/
    });
    
    Page.loadEventFired(() => {
        //Runtime.evaluate({expression: 'getAllThings()'});
        Runtime.evaluate({expression: 'getAllThings();getToken()'});
        //console.log('Cookies:\n' + JSON.stringify(Network.getAllCookies()));
        //client.close();
    });
    
    // enable events then start!
    Promise.all([
        Network.enable(),
        Page.enable()
    ]).then(() => {
        Page.navigate({url: 'http://10.16.0.120:9000/things.html'});
    }).catch((err) => {
        console.error(err);
        client.close();
    });
}).on('error', (err) => {
    // cannot connect to the remote endpoint
    console.error(err);
});
