const Gate = require('../models/gate');
const ObjectId = require("mongodb").ObjectId;

exports.getGate = async (req, res) => {
  try {
    const allGate = await Gate.find();
    res.json(allGate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getGateById = async (req, res) => {
  try {
    const gate = await Gate.findById(req.params._id);

    if (!gate) {
      return res.status(404).json({ message: 'Gate not found' });
    }

    res.status(200).json(gate);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format or error retrieving Gate' });
  }
};

exports.createGate = async (req, res) => {
  const gate = new Gate({
    type: req.body.type,
    coreType: req.body.coreType,
    boosts: req.body.boosts
  });

  try {
    const newGate = await gate.save();
    res.status(201).json(newGate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateGate = async (req, res) => {
  try {
    const updatedGate = await Gate.findByIdAndUpdate(
      req.params._id,
      {
        type: req.body.type,
        coreType: req.body.coreType,
        boosts: req.body.boosts
      },
      { new: true, runValidators: true }
    );

    if (!updatedGate) {
      return res.status(404).json({ message: 'Gate not found' });
    }

    res.status(200).json(updatedGate);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteGate = async (req, res) => {
  try {
    const deletedGate = await Gate.findByIdAndDelete(req.params._id);

    if (!deletedGate) {
      return res.status(404).json({ message: 'Gate not found' });
    }

    res.status(200).json({ message: 'Gate deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
