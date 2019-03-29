var constants = require('../constants');
var sftp = require('../sftp.connection');

var consolesRoot = constants.sftp.romsRoot;

exports.getRPState = getRPState;

/**
 * Get all consoles and roms states from Retropie
 * @param {*} resolve resolve function
 */
function getRPState(resolve) {

    // The consoles list
    var consoles = [];
    sftp.list(consolesRoot)
    .then(data => {
        
        // Create a list of consoles
        getConsoles(data, consoles);
        
        consoles.forEach(function(console) {
            var consoleName = console.name;
            
            // List all roms in the console
            sftp.list(consolesRoot.concat("/").concat(consoleName))
                .then(romData => {

                    // Creates a list of roms in this console
                    getRoms(romData, consoleName, console);
                    
                    console.romsListed = true;

                    // If all rom consoles are listed then render
                    var areAllConsolesTraited = consoles.map(consoleListed => consoleListed.romsListed).reduce((total, sum) => total && sum);
                    areAllConsolesTraited ? resolve(consoles) : null;
            });
        });
    
    });
}
    
/**
 * Creates a list of console object
 * @param {*} data data from sftp
 * @param {*} consoles list of consoles
 */
function getConsoles(data, consoles) {
    data.forEach(function (consoleInRP) {
        var consoleName = consoleInRP.name;
        var console = {
            name: consoleName,
            roms: [],
            romsListed : false
        };

        consoles.push(console);
    });
    
    // Sort consoles by name
    consoles.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
    });
}

/**
 * Creates a list of consoles
 * @param {*} romData 
 * @param {String} consoleName 
 * @param {*} console 
 */
function getRoms(romData, consoleName, console) {
    romData.forEach(function (romInRP) {
        var rom = {
            romName: romInRP.name,
            console: consoleName
        };
        console.roms.push(rom);
    });
    
    // Sort roms by name
    console.roms.sort(function (a, b) {
        if (a.romName > b.romName) {
            return 1;
          }
          if (a.romName < b.romName) {
            return -1;
          }
          // a must be equal to b
          return 0;
    });
}
