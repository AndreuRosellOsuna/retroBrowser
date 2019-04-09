var constants = require('../constants');

exports.renderIndex = function (req, res) {

    res.json({
        title : constants.index.title,
        body : constants.index.body
    });
}