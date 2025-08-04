const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    bakugan: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bakugan',
        validate: {
            validator: arr => arr.length === 3,
            message: 'Deck must contain exactly 3 Bakugan'
        }
    }],
    gates: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gate',
        validate: {
            validator: arr => arr.length === 3,
            message: 'Deck must contain exactly 3 Gate cards'
        }
    }],
    cores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Core',
        validate: {
            validator: arr => arr.length === 3,
            message: 'Deck must contain exactly 3 BakuCores'
        }
    }]
});

module.exports = mongoose.model('Deck', itemSchema);
