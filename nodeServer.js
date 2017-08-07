/**
 * Created by anuradhawick on 8/7/17.
 */
const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
const options = {
    key: fs.readFileSync('./openssl/key.pem'),
    cert: fs.readFileSync('./openssl/cert.pem'),
    passphrase: 'dvios'
};
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(80);
httpsServer.listen(443);

app.use('/', express.static(path.resolve(__dirname, 'dist')));
app.use('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist') + '/index.html');
});
