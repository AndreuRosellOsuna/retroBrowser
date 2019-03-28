var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
    name : String,
    romName : String,
    console : String
})

/** Game model */
mongoose.model('Game', GameSchema);
