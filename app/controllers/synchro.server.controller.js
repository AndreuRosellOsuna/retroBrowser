var constants = require('../constants');

exports.renderSynchro = function (req, res) {
    res.render('synchro', {
        title : constants.synchro.title,
        button : constants.synchro.button
    });
}
