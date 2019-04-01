var constants = require('../constants');

var sftpService = require('../services/sftp.retropiestate.service');
var dbCopyService = require('../services/db.copy.service');

var mongoose = require('mongoose');
var Game = mongoose.model('Game');

exports.performSynchro = function (req, res) {
    
    var gamesInRp = [];
    var gamesInDb = [];

    // create a global promise
    var globalPromise = new Promise(function(globalResolve, globalReject) {

        var promiseState = {
            rp : false,
            db : false
        };

        // get rp state
        callRP(gamesInRp, promiseState, globalResolve, globalReject);

        // get db state
        callDB(gamesInDb, promiseState, globalResolve, globalReject);

    }).then(function() {
        // render(res, 'OK');
        
        var writePromise = new Promise(function(writeResolve, writeReject) {
            
            dbCopyService.doCopyFromRPToDb(gamesInRp, gamesInDb, writeResolve, writeReject);
            
        }).then(function() {
            render(res, 'OK');

        }, function(err) {
            console.log(err);
            render(res, 'KO');
        });

    }, function(err) {
        // next(err);
        console.log(err);
        render(res, 'KO');
    });
}


function callRP(gamesInRp, promiseState, globalResolve, globalReject) {
    // get remote RP state
    var rpPromise = new Promise(function(resolve, reject) {
        
        // Get state from RetroPie
        sftpService.getRPState(resolve);
    }).then(function(resolveData) {

        resolveData.forEach(function(data) {
            gamesInRp.push(data);
        });
        
        promiseState.rp = true;
        if(promiseState.db) {
            globalResolve();
        }
        
    }, function(err) {
        // error
        globalReject(err);
    });
}

function callDB(gamesInDb, promiseState, globalResolve, globalReject) {
    
    // get all games from db
    Game.find({
    }, (err, gamesDb) => {
        if(err) {
            globalReject(err);
        } else {

            gamesDb.forEach(function(game) {
                gamesInDb.push(game);
            });

            promiseState.db = true;
            if(promiseState.rp) {
                globalResolve();
            }
        }
    });
}

/**
 * Render the synchro result
 * @param {*} res 
 * @param {string} result
 */
function render(res, result) {
    res.render('synchroResult', {
        title: constants.synchro.title,
        result: result
    });
}