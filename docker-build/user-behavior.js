const CDP = require('chrome-remote-interface');

CDP((client) => {
    // extract domains
    const {Network, Page, Runtime} = client;
    
    // enable events then start!
    Promise.all([
        Network.enable(),
        Page.enable()
    ]).then(() => {
        Page.navigate({url: 'http://localhost:9000/background-page.html'});
    }).catch((err) => {
        console.error(err);
        client.close();
    });
}).on('error', (err) => {
    // cannot connect to the remote endpoint
    console.error(err);
});
