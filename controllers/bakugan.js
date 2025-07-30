const Bakugan = require('../models/bakugan');
const ObjectId = require("mongodb").ObjectId;

exports.getBakugan = async (req, res) => {
    try{
        const allBakugan = await Bakugan.find();
        res.json(allBakugan);
    } catch(err) {
        res.status(500).json({message: err.message});
    }
};


exports.createBakugan = async (req, res) => {
    const bakugan = new Bakugan({
        name: req.body.name,
        type: req.body.type,
        faction: req.body.faction,
        power: req.body.power,
        damage: req.body.damage,
        cores: req.body.cores,
        effect: req.body.effect
    })
    try {
        const newBakugan = await bakugan.save();
        res.status(201).json(newBakugan);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

exports.updateBakugan = async (req, res) => {
  try {
    const updatedBakugan = await Bakugan.findByIdAndUpdate(
      req.params._id, 
      {
        name: req.body.name,
        type: req.body.type,
        faction: req.body.faction,
        power: req.body.power,
        damage: req.body.damage,
        cores: req.body.cores,
        effect: req.body.effect
      },
      { new: true, runValidators: true }
    );

    if (!updatedBakugan) {
      return res.status(404).json({ message: 'Bakugan not found' });
    }

    res.status(200).json(updatedBakugan);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteBakugan = async (req, res) => {
  try {
    const deletedBakugan = await Bakugan.findByIdAndDelete(req.params._id);

    if (!deletedBakugan) {
      return res.status(404).json({ message: 'Bakugan not found' });
    }

    res.status(200).json({ message: 'Bakugan deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

