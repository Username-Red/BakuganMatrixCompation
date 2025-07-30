const express = require('express');
const router = express.Router();

const { getGate, createGate, updateGate, deleteGate } = require('../controllers/gate');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getGate);
router.post('/', createGate);
router.put('/:_id',  updateGate);
router.delete('/:_id',  deleteGate);


module.exports = router;

