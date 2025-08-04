const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    type: String,
    boost: String,
    

});

module.exports = mongoose.model('Core', itemSchema);
