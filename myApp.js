var express = require('express');
var constants = require('./run_constants');

require('./app/database');
require('./app/sftp.connection');

var app = express();

app.set('views', './app/views');
app.set('view engine', 'ejs');

require('./app/routes')(app);

// ftp config
// require('./app/sftp-client');
// var sftp = require('./app/sftp.connection'); // connect only in synchro

var port = constants.run.server.port;
app.listen(port);
console.log('launching app in port ' + port);

module.exports = app;
