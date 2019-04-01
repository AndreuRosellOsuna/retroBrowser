var constants = require('../constants');
var sftpService = require('../services/sftp.retropiestate.service');

exports.getRetropieState = function(req, res) {
    
    var consoles;
    var promise = new Promise(function(resolve, reject) {
    
        // Get state from RetroPie
        sftpService.getRPState(resolve);
    });

    promise.then(function(resolveData) {
        consoles = resolveData;
        render(res, consoles);
    }, function(err) {
        // error
    });
}

/**
 * Render the consoles
 * @param {*} res 
 * @param {*} сonsoles
 */
function render(res, consoles) {
    res.render('retropie', {
        title: constants.retropie.title,
        consoles: consoles
    });
}