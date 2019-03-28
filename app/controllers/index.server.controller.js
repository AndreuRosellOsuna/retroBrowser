var constants = require('../constants');

exports.renderIndex = function (req, res) {
    res.render('index', {
        title : constants.index.title,
        body : constants.index.body
    });
}