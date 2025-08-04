const Deck = require('../models/deck');
const ObjectId = require("mongodb").ObjectId;

exports.getDecks = async (req, res) => {
    try {
        const allDecks = await Deck.find()
            .populate('bakugan')
            .populate('gates')
            .populate('cores');

        res.json(allDecks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


exports.createDeck = async (req, res) => {
    const deck = new Deck({
        bakugan: req.body.bakugan,
        gates: req.body.gates,
        cores: req.body.cores,
    })
    try {
        const newDeck = await deck.save();
        res.status(201).json(newDeck);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateDeck = async (req, res) => {
  try {
    const updatedDeck = await Deck.findByIdAndUpdate(
      req.params._id, 
      {
        bakugan: req.body.bakugan,
        gates: req.body.gates,
        cores: req.body.cores,
      },
      { new: true, runValidators: true }
    );

    if (!updatedDeck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    res.status(200).json(updatedDeck);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteDeck = async (req, res) => {
  try {
    const deletedDeck = await Deck.findByIdAndDelete(req.params._id);

    if (!deletedDeck) {
      return res.status(404).json({ message: 'Deck not found' });
    }

    res.status(200).json({ message: 'Deck deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

