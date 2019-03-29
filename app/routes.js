module.exports = function(app) {
    var indexController = require('./controllers/index.server.controller');
    app.get('/', indexController.renderIndex);

    var сonsolesController = require('./controllers/consoles.server.controller');
    app.get('/consoles', сonsolesController.renderConsoles);
    
    var gamesController = require('./controllers/games.server.controller');
    app.get('/games', gamesController.renderGames);
    
    var gameDetailController = require('./controllers/gameDetail.server.controller');
    app.get('/gameDetail/:gameName', gameDetailController.renderGame);
    
    var synchroController = require('./controllers/retropie.server.controller');
    app.get('/retropie', synchroController.doSynchro);
};