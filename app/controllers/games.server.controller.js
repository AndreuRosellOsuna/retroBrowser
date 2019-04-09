var constants = require('../constants');
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

exports.renderGames = function(req, res, next) {
    /** the games */
    var games = [];
    
    Game.find({
        // console : "console1"
    }, (err, gamesDb) => {
        if(err) {
            return next(err);
        } else {
            games = gamesDb;
            
            res.json({
                games : games
            })
        }
    })
}