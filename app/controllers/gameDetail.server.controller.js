var constants = require('../constants');
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

exports.renderGame = function(req, res) {
    /** the game */
    var game;
    
    Game.find({
        name : req.params.gameName
    }, (err, gameDb) => {
        if(err) {
            return next(err);
        } else {
            game = gameDb[0];
            
            res.render('gameDetail', {
                title : constants.games.title,
                game : game
            })
        }
    })
}