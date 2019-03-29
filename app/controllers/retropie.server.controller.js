var constants = require('../constants');
var sftp = require('../sftp.connection');

var consolesRoot = constants.sftp.romsRoot;
var consoles;

exports.doSynchro = function(req, res) {
    
    consoles = [];
    var promise = new Promise(function(resolve, reject) {
    
        // Get state from RetroPie
        getRPState(resolve);
    });

    promise.then(function() {
        render(res);
    }, function(err) {
        // error
    });
}

/**
 * Get all consoles and roms states from Retropie
 * @param {*} resolve 
 */
function getRPState(resolve) {
    sftp.list(consolesRoot)
    .then(data => {
        
        // Create a list of consoles
        getConsoles(data);
        
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
                    areAllConsolesTraited ? resolve() : null;
            });
        });
    
    });
}
    
/**
 * Creates a list of console object
 * @param {*} data 
 */
function getConsoles(data) {
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

/**
 * Render method
 * @param {*} res 
 */
function render(res) {
    res.render('synchroOk', {
        title: constants.synchro.title,
        consoles: consoles
    });
}