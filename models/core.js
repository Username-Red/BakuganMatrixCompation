const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    boost: String,
    faction: String,

});

module.exports = mongoose.model('Core', itemSchema);
