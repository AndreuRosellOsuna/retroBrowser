var constants = require('../constants');

var mongoose = require('mongoose');
var Game = mongoose.model('Game');
var Console = mongoose.model('Console');


exports.doCopyFromRPToDb = doCopyFromRPToDb;

/**
 * Copy remote state from retropie to db
 * @param {*} rpState the actual list of consoles and games in rp
 * @param {*} dbState the actual list of consoles and games in the db
 * @param {*} writeResolve resolve promise function
 * @param {*} writeReject reject promise function
 */
function doCopyFromRPToDb(rpState, dbState, writeResolve, writeReject) {

    var consoles = rpState;

    var savePromises = {};
    
    consoles.forEach(console => {

        var consoleName = console.name;

        saveConsole(consoleName, dbState);

        console.roms.forEach(rom => {
            
            // look for games to save in db
            var gameInDB = dbState.map(function(game) {
                return game.romName;
            }).includes(rom.romName);

            if(!gameInDB) {

                // init game promise
                var saveKey = "rp".concat(consoleName).concat(rom.romName);
                savePromises[saveKey] = false;

                var gameProps = {
                    name : rom.romName,
                    romName : rom.romName,
                    console : consoleName
                };                
                var newGame = new Game(gameProps);
                
                // save the game in db
                newGame.save(function(err) {
                    if(err) {
                        writeReject("impossible to write game " + newGame.name);
                    } else {

                        savePromises[saveKey] = true;
                        
                        // look for other promises
                        var allOperationsPerformed = Object.keys(savePromises).map(function(key) {
                            return savePromises[key];
                        }).reduce((total, sum) => total && sum);

                        if(allOperationsPerformed) {
                            writeResolve();
                        }
                    }
                });
            }
        });
    });

    var gamesInRP = consoles.map(console => console.roms).reduce(function(accumulator, currentValue) {
        return accumulator.concat(currentValue);
    }, []);

    var romNameGames = gamesInRP.map(game => game.romName);

    dbState.forEach(game => {

        var gameName = game.romName;

        if(!romNameGames.includes(gameName) && !game.deleted) {

            // init game promise
            var saveKey ="db".concat(gameName); 
            savePromises[saveKey] = false;

            // update game as deleted
            Game.findOneAndUpdate({
                romName : gameName
            },
            {
                deleted : Date.now()
            }, 
            function(err) {
                if(err) {
                    writeReject("impossible to update game " + gameName);
                } else {
                    // look for other promises
                    
                    savePromises[saveKey] = true;

                    var allOperationsPerformed = Object.keys(savePromises).map(function(key) {
                        return savePromises[key];
                    }).reduce((total, sum) => total && sum);
                    
                    if(allOperationsPerformed) {
                        writeResolve();
                    }
                }
            });
        }

    });

    /**
     * Save the console in data base if not exists
     * @param {*} consoleName the console name
     * @param {*} dbState the actual list of games and consoles in db
     */
    function saveConsole(consoleName, dbState) {
        
        // look for consoles to save in db
        var consoleInDB = dbState.map(function(game) {
            return game.console;
        }).includes(consoleName);

        if(!consoleInDB) {

            // init game promise
            var saveKey ="db.consoles.".concat(consoleName); 
            savePromises[saveKey] = false;

            var newConsole = new Console({
                name : consoleName
            });
            newConsole.save(function(err){
                if(err) {
                    writeReject("impossible to write console " + consoleName);
                } else {

                    savePromises[saveKey] = true;
                    
                    // look for other promises
                    var allOperationsPerformed = Object.keys(savePromises).map(function(key) {
                        return savePromises[key];
                    }).reduce((total, sum) => total && sum);

                    if(allOperationsPerformed) {
                        writeResolve();
                    }
                }
            });
        }

    Object.keys(savePromises).length == 0 ? writeResolve() : null;
    }
}
    