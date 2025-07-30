const mongoose = require('mongoose');

const gateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  boosts: {
    type: [mongoose.Schema.Types.Mixed],
    validate: {
      validator: function (arr) {
        return (
          Array.isArray(arr) &&
          arr.length === 6 &&
          arr.filter(i => typeof i === 'string').length <= 1 &&
          arr.every(i => typeof i === 'number' || typeof i === 'string')
        );
      },
      message: 'Boosts must contain exactly 6 items, with at most one string.'
    }
  },
  coreType: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Gate', gateSchema);
