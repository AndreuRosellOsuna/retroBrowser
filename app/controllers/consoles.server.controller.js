var constants = require('../constants');

var mongoose = require('mongoose');
var Console = mongoose.model('Console');

exports.renderConsoles = function(req, res, next) {
    /** the consoles */
    var consoles = [];
    
    Console.find({}, function(err, consolesDB) {
        if(err) {
            next();
        } else {
            res.json({
                consoles : consolesDB
            });
        }
    });
}