var mongoose = require('mongoose');

var GameSchema = new mongoose.Schema({
    name : String,
    romName : String,
    console : String,
    created : {
        type : Date,
        default : Date.now
    },
    deleted : Date
})

/** Game model */
mongoose.model('Game', GameSchema);
