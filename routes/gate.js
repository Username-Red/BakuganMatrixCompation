const express = require('express');
const router = express.Router();

const { getGate, getGateById, createGate, updateGate, deleteGate } = require('../controllers/gate');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getGate);
router.get('/:_id', getGateById);
router.post('/', isAuthenticated, createGate);
router.put('/:_id', isAuthenticated, updateGate);
router.delete('/:_id', isAuthenticated, deleteGate);


module.exports = router;

