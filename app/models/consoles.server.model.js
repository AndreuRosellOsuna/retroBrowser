var mongoose = require('mongoose');

var ConsoleSchema = new mongoose.Schema({
    name : String
})

/** Game model */
mongoose.model('Console', ConsoleSchema);
