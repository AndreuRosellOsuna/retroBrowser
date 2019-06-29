module.exports = function(app) {

    app.get('/', (req, res) => {
        res.redirect('index.html');
    });

    var сonsolesController = require('./controllers/consoles.server.controller');
    app.get('/services/consoles', сonsolesController.renderConsoles);
    
    var gamesController = require('./controllers/games.server.controller');
    app.get('/services/games', gamesController.renderGames);
    
    // var gameDetailController = require('./controllers/gameDetail.server.controller');
    // app.get('/gameDetail/:gameName', gameDetailController.renderGame);
            
    var performSynchroController = require('./controllers/performSynchro.server.controller');
    app.get('/services/performSynchro', performSynchroController.performSynchro);
};