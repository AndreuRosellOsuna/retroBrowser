var constants = require('../constants');
var mongoose = require('mongoose');
var Game = mongoose.model('Game');

exports.renderGames = function (req, res, next) {
    /** the games */
    var games = [];

    let params = {};

    if(req.query.console) {
        params["console"] = req.query.console;
    }

    Game.find(params, (err, gamesDb) => {
        if (err) {
            return next(err);
        } else {
            games = gamesDb;
            res.json(games)
        }
    })
}
