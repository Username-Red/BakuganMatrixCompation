const Core = require('../models/core');
const ObjectId = require("mongodb").ObjectId;

exports.getCores = async (req, res) => {
    try{
        const allCores = await Core.find();
        res.json(allCores);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};


exports.createCore = async (req, res) => {
    const core = new core({
        type: req.body.type,
        boost: req.body.boost
    })
    try {
        const newCore = await core.save();
        res.status(201).json(newCore);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateCore = async (req, res) => {
  try {
    const updatedCore = await core.findByIdAndUpdate(
      req.params._id, 
      {
        type: req.body.type,
        boost: req.body.boost
      },
      { new: true, runValidators: true }
    );

    if (!updatedCore) {
      return res.status(404).json({ message: 'core not found' });
    }

    res.status(200).json(updatedCore);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCore = async (req, res) => {
  try {
    const deletedCore = await core.findByIdAndDelete(req.params._id);

    if (!deletedCore) {
      return res.status(404).json({ message: 'core not found' });
    }

    res.status(200).json({ message: 'core deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

