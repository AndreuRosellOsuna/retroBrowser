var mongoose = require('mongoose');
var consts = require('../run_constants');

mongoose.connect(consts.run.db).then(function () {
    console.log('db connected on ' + consts.run.db);
});

require('./models/games.server.model');
require('./models/consoles.server.model');

module.exports = mongoose;
