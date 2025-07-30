const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: String,
    faction: String,
    power: Number,
    damage: Number,
    cores: [String],
    effect: String,

});

module.exports = mongoose.model('Bakugan', itemSchema);
