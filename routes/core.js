const express = require('express');
const router = express.Router();

const { getCores, getCoreById, createCore, updateCore, deleteCore } = require('../controllers/core');
const { isAuthenticated } = require("../middleware/authenticate")
router.get('/', getCores);
router.get('/:_id', getCoreById);
router.post('/', isAuthenticated, createCore);
router.put('/:_id', isAuthenticated, updateCore);
router.delete('/:_id', isAuthenticated, deleteCore);


module.exports = router;

