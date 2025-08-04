const express = require('express');
const router = express.Router();

const { getCores, getCoreById, createCore, updateCore, deleteCore } = require('../controllers/core');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getCores);
router.get('/:_id', getCoreById);
router.post('/', createCore);
router.put('/:_id',  updateCore);
router.delete('/:_id',  deleteCore);


module.exports = router;

