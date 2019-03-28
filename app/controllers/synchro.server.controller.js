var constants = require('../constants');
var sftp = require('../sftp.connection');

var consolesRoot = constants.sftp.romsRoot;
var consoles;

exports.doSynchro = function(req, res) {
    
    consoles = [];
    var promise = new Promise(function(resolve, reject) {
    
        getRPState(resolve);
    
    });

    promise.then(function() {
        render(res);
        
    }, function(err) {
        // error
    });
}

function getRPState(resolve) {
    sftp.list(consolesRoot)
    .then(data => {
        
        getConsoles(data);
        
        consoles.forEach(function(console) {
            var consoleName = console.name;
            
            // get the roms in console
            sftp.list(consolesRoot.concat("/").concat(consoleName))
                .then(romData => {
                    getRoms(romData, consoleName, console);
                    
                    console.romsListed = true;

                    var areAllConsolesTraited = consoles.map(consoleListed => consoleListed.romsListed).reduce((total, sum) => total && sum);
                    areAllConsolesTraited ? resolve() : null;
            });
        });
    
    });
}
    

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
}

function getRoms(romData, consoleName, console) {
    romData.forEach(function (romInRP) {
        var rom = {
            romName: romInRP.name,
            console: consoleName
        };
        console.roms.push(rom);
    });
}

function render(res) {
    res.render('synchroOk', {
        title: constants.synchro.title,
        consoles: consoles
    });
}