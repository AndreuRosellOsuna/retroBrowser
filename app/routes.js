module.exports = function(app) {

    app.get('/', (req, res) => {
        res.redirect('index.html');
    });

    // var indexController = require('./controllers/index.server.controller');
    // app.get('/', indexController.renderIndex);

    var сonsolesController = require('./controllers/consoles.server.controller');
    app.get('/services/consoles', сonsolesController.renderConsoles);
    
    var gamesController = require('./controllers/games.server.controller');
    app.get('/services/games', gamesController.renderGames);
    
    // var gameDetailController = require('./controllers/gameDetail.server.controller');
    // app.get('/gameDetail/:gameName', gameDetailController.renderGame);
    
    // var retropieController = require('./controllers/retropie.server.controller');
    // app.get('/retropie', retropieController.getRetropieState);
    
    // var synchroController = require('./controllers/synchro.server.controller');
    // app.get('/synchro', synchroController.renderSynchro);
    
    // var performSynchroController = require('./controllers/performSynchro.server.controller');
    // app.get('/performSynchro', performSynchroController.performSynchro);
};