var constants = require('../constants');
var sftp = require('../sftp.connection');

exports.renderConsoles = function(req, res) {
    /** the consoles */
    var consoles = [];
    
    sftp.list(constants.sftp.romsRoot)
    .then(data => {

        data.forEach(function(consoleInRP)   {
            consoles.push({code : consoleInRP.name});
        });

        res.render('consoles', {
            title : constants.consoles.title,
            consoles : consoles
        });

    });    
}