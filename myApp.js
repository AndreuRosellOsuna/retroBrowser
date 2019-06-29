var express = require('express');
var constants = require('./run_constants');

require('./app/database');

var app = express();

if(constants.mode.dev) {
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}

require('./app/routes')(app);

app.use(express.static('./public'));


// ftp config
// require('./app/sftp-client');
// var sftp = require('./app/sftp.connection'); // connect only in synchro

var port = constants.run.server.port;
app.listen(port);
console.log('launching app in port ' + port);

module.exports = app;
