var constants = require('../constants');
var sftp = require('../sftp.connection');

var consoles = [];

sftp.list(constants.sftp.romsRoot)
    .then(data => {

        data.forEach(function(consoleInRP)   {
            consoles.push(consoleInRP);
        });

        console.log(consoles);
});

exports